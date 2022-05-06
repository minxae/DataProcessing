const mysql = require("mysql"); //Mysql
const Ajv = require("ajv");
const ajv = new Ajv();

// -database connection 
const conn = mysql.createConnection(
    {
        host: '127.0.0.1', //change this to your OWN localhost
        user: 'root',   //  OWN root
        password: '1234', // OWN password
        database: 'income_per_country'  // Doesn't need any change
    });

// - return object 
const object = 
        {
            "Status": 404,
            "Message" : ""
        }

// -gets all data from selected table
async function getAllData(table)
{
    const query = "SELECT * FROM "+ table;
    return new Promise((res, error) =>
    {
        conn.query(query, function(err, result, fields)
        {
            if(err) error("Something went wrong!");

            res(result)
        });
    });
    
}

// -Gets one record from selected country by year
async function getOneSingleRecord(req, table)
{
    return new Promise(res =>
    {
        const country = req.params.country;
        const values = [country]; //removing sqlInjections
        const query = "SELECT * FROM "+ table +" WHERE Country = ?";
        conn.query(query, values, function(err, result)
        {
            if(err)throw err;
            res(result);
        });
    });
}

// -Updating multiple record or one record.
async function updateData(req, table)
{
    return new Promise(res =>
    {
        const data = req.body;
        const values = [];
        const query = makeSqlStringUpdate(data, table);// lets you update multiple records
        const checkQuery = "SELECT * FROM " + table + " WHERE Country = ?"

            conn.query(checkQuery, values, function(err, result)
            {
                if(result.length > 0)
                {
                    object.Status = 404;
                    object.Message = "Country already exists, you can only add unique countries.";
                    res(object)
                }else
                {
                    conn.query(query, values, function(err, result, fields)
                    {   
                        if(err)throw err;
                        object.Status = 202;
                        object.Message = "Country : " + country + " created with succes.";
                        res(object);
                    });
                }
            });
    });

}
async function addCountry(req, table)
{
    return new Promise((res, error) =>
        {
            const country = req.body.country;
            const values = [country];
            const query = "INSERT INTO "+ table +" (Country) VALUES (?)"

            const checkQuery = "SELECT * FROM " + table + " WHERE Country = ?"

            conn.query(checkQuery, values, function(err, result)
            {
                if(result.length > 0)
                {
                    object.Status = 404;
                    object.Message = "Country already exists, you can only add unique countries.";
                    res(object)
                }else
                {
                    conn.query(query, values, function(err, result, fields)
                    {   
                        if(err)throw err;
                        object.Status = 202;
                        object.Message = "Country : " + country + " created with succes.";
                        res(object);
                    });
                }
            });
        });
}

async function deleteCountry(req, table)
{
    const country = req.params.country;
    return new Promise((res, error) =>
    {
        const values = [country]
        const query = "DELETE FROM " + table + " WHERE Country = ?"
        const checkQuery = "SELECT * FROM " + table + " WHERE Country = ?"

        conn.query(checkQuery, values, function(err, result)
            {
                if(result.length > 0)
                {
                    conn.query(query, values, function(err, result, fields)
                    {   
                        if(err)throw err;
                        object.Status = 200;
                        object.Message = "Country : " + country + " deleted with succes.";
                        res(object);
                    });
                }else
                {
                    object.Status = 204;
                    object.Message = "Country doesn't exist.";
                    res(object);
                }
            });
    });
}


// -This function is used to update multiple records.
// -The amount of records depends on how many the user wants to update at once.
function makeSqlStringUpdate(object, table)
{
    var query = "UPDATE " + table + " SET "; 
    var country = "'" + object.country + "'"; 
    var end = "WHERE Country = " + country;
    for(x in object)
    {
        if(x == "data")
        {
            for(year in object[x])
            {
                query = query + "`" + year + "`" + " = " + "'" + object[x][year] +"'" + " ,";
            }
        }
    }
    var result = query.slice(0, -1) + end;
    console.log(result)
    return result;
};

// -Custom function to check what type of format is being send to the api.
function checkContentType(type)
{
    if(type == "application/json" )
    {
        return true;
    }
    return false;
}
// -If the one of the two returns true that means the request is valid.
function validator(body)
{
    const JSONValidator = ajv.validate(GNI_MaleFemale_schema, body)
    const XMLValidator = false;
    if(JSONValidator || XMLValidator)
    {
        return true;
    }else
    {
        return false;
    }
}



module.exports = {
    getAllData: getAllData,
    getOneSingleRecord: getOneSingleRecord,
    updateData: updateData,
    addCountry: addCountry,
    deleteCountry: deleteCountry
}
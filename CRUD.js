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
        const country = req.body[0].Country;
        const values = [country];//removing sqlInjections
        const query = "SELECT * FROM "+ table +" WHERE Country = ?";
        conn.query(query, values, function(err, result)
        {
            if(err)throw err;
            console.log(result)
            res(result)
        });
    });
}

// -Updating multiple record or one record.
async function updateData(req, table)
{
    return new Promise(res =>
    {
        const data = req.body;

        const query = makeSqlStringUpdate(data, table);// lets you update multiple records
        conn.query(query, function(err, result)
        {   
            if(err)throw err;
            res("Updated");
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

            conn.query(query, values, function(err,result, fields)
            {   
                if(err) error("Something went wrong!");
                res("Country created: "+ country);// country that has been created
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
        conn.query(query, values, function(err)
        {   
            if(err) throw err;
            res("Deleted record with country: " + country);// record the has been deleted from the table
        })
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
                query = query + "`" + year + "`" + " = " + object[x][year] + " ,";
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
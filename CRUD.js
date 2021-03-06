const mysql = require("mysql"); //Mysql
const Ajv = require("ajv");
const ajv = new Ajv();
const xml2js = require("xml2js");

// -JSON schemas
const GNI_MaleFemale_schema = require("./JSON_Schemas/JSON_schema_GNI_FemaleMale.json");
const GNI_create_country = require("./JSON_Schemas/JSON_schema_GNI_create_country.json");
const GNI_Per_capita_schema = require("./JSON_Schemas/JSON_schema_GNI_per_capita.json");


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
        const values = [req.body.country];
        const query = makeSqlStringUpdate(data, table);// lets you update multiple records
        const checkQuery = "SELECT * FROM " + table + " WHERE Country = ?"

            conn.query(checkQuery, values, function(err, result)
            {
                if(result.length > 0)
                {  
                    conn.query(query, values, function(err, result, fields)
                    {   
                        if(err)throw err;
                        object.Status = 200;
                        object.Message = "Updated: " + req.body.country ;
                        res(object);
                    });
                    
                }else
                {
                    object.Status = 404;
                    object.Message = "Country doesn't exist, maybe the country name is wrong.";
                    res(object)
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
                        object.Status = 201;
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
// - Middleware function that checks if JSON/XML structure is correct for parsing it through.
// - XML 
const validation = function(req, res, next)
{
    const type = req.headers['content-type']; 
    console.log(type);
    if(type == "application/json")
    {
        const schemaA = ajv.validate(GNI_MaleFemale_schema, req.body);
        const schemaB = ajv.validate(GNI_create_country, req.body);
        const schemaC = ajv.validate(GNI_Per_capita_schema, req.body);

        if(schemaA || schemaB || schemaC)
        {
            next();
        }else
        {
            res.status(400);
            res.send("Your request is not send in the right format, check the structure please.");
        }  
    }else
    {
        console.log(req.rawBody);
        // xml2js.parseString(req.body, (err, result) => {
        //     if(err) {
        //         throw err;
        //     }
        
        //     const json = JSON.stringify(result, null, 4);
        
        //     // log JSON string
        //     console.log(json);
        // });
    } 
}



module.exports = {
    validation: validation,
    getAllData: getAllData,
    getOneSingleRecord: getOneSingleRecord,
    updateData: updateData,
    addCountry: addCountry,
    deleteCountry: deleteCountry
}
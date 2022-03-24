const mysql = require("mysql"); //Mysql
const Ajv = require("ajv");
const ajv = new Ajv();

//schemas
const GNI_MaleFemale_schema = require("./JSON_Schemas/JSON_schema_GNI_Male.json");
const GNI_MaleFemale_schema_single_record = require("./JSON_Schemas/JSON_schema_GNI_Male_single_record.json");
const GNI_Per_capita_schema = require("./JSON_Schemas/JSON_schema_GNI_per_capita.json");

const conn = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '1234',
        database: 'income_per_country'  
    });

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
async function getOneSingleRecord(req, tabel)
{
    return new Promise((res, error) =>
    {
        const valid = ajv.validate(GNI_MaleFemale_schema_single_record, req.body);
        if(valid)
        {
            const year = req.body[0].Year;
            const country = req.body[0].Country;
            
            const values = [year, table, country];//removing sqlInjections
            const query = "SELECT `?` FROM ? WHERE Country = ?";
            conn.query(query, values, function(err, result)
            {
                if(err) error("Something went wrong!");
                res(result)
            })
        }else
        {
            res("Invalid Json");
        }
        
    });
}
async function updateData(req, table)
{
    return new Promise((res, error) =>
    {
        const data = req.body;
        const valid = ajv.validate(GNI_MaleFemale_schema, data)
        if(valid)
        {
            const query = makeSqlStringUpdate(data, table);
            conn.query(query, function(err, result)
            {   
                if(err) error("Something went wrong!");
                res("Updated")
            });
            
        }else
        {
            res("JSON invalid");
        }
        
    });

}
async function addCountry(req, table)
{
    return new Promise((res, error) =>
        {
            const data = req.body;
            const country = req.body.country;
            const values = [country];
            const valid = ajv.validate(GNI_MaleFemale_schema, data);
            const query = "INSERT INTO "+ table +" (Country) VALUES (?)"

            if(valid)
            {
                conn.query(query, values, function(err,result, fields)
                {   
                    if(err) error("Something went wrong!");
                    res("Country created: "+ country);
                });
            }else
            {
                res("Invalid JSON");
            }
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
            res("Deleted record with country: " + country);
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

module.exports = {
    getAllData: getAllData,
    getOneSingleRecord: getOneSingleRecord,
    updateData: updateData,
    addCountry: addCountry,
    deleteCountry: deleteCountry
}
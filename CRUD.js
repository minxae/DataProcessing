const mysql = require("mysql"); //Mysql
const Ajv = require("ajv");
const ajv = new Ajv();

//schemas


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
        const year = req.body[0].Year;
        const country = req.body[0].Country;
        
        const values = [year, table, country];//removing sqlInjections
        const query = "SELECT `?` FROM ? WHERE Country = ?";
        conn.query(query, values, function(err, result)
        {
            if(err) error("Something went wrong!");
            res(result)
        });
    });
}
async function updateData(req, table)
{
    return new Promise((res, error) =>
    {
        const data = req.body;

        const query = makeSqlStringUpdate(data, table);
        conn.query(query, function(err, result)
        {   
            if(err) error("Something went wrong!");
            res("Updated")
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
                res("Country created: "+ country);
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

// -Custom function to check what type of format is being send to the api.
function checkContentType(type)
{
    if(type == "application/json" )
    {
        return true;
    }
    return false;
}



module.exports = {
    getAllData: getAllData,
    getOneSingleRecord: getOneSingleRecord,
    updateData: updateData,
    addCountry: addCountry,
    deleteCountry: deleteCountry
}
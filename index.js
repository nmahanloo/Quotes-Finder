// Initializing Express
const express = require('express');
const app = express();
const pool = require("./dbPool.js");
app.set("view engine", "ejs");
app.use(express.static('public'));
// Start the server over port 3000
app.listen(3000, () => {
  console.log('server started');
});

// Routes
// Test database and API
app.get("/dbTest", async function(req, res){
  let sql = "SELECT * FROM q_quotes";
  let rows = await executeSQL(sql, []);
  res.send(rows);
});

// Display home page
app.get('/', async (req, res) => {
  let sql = `SELECT DISTINCT category from q_quotes`;
  let categories = await executeSQL(sql, []);
  sql = `SELECT authorId, firstName, lastName 
            FROM q_authors 
            ORDER BY lastName`;
  let rows = await executeSQL(sql, []);
  res.render('index', {"authors":rows, "categories":categories});
});

// Search quotes by a keyword
app.get('/searchByKeyword', async (req, res) => {
  let userKeyword = req.query.keyword;
  console.log(userKeyword);
  let sql = `SELECT authorId, firstName, lastName, quoteId, quote, category, likes 
            FROM q_quotes NATURAL JOIN q_authors 
            WHERE quote Like ?`;
  let params = [`%${userKeyword}%`];
  let rows = await executeSQL(sql, params);
  res.render("results", {"quotes":rows});
});

// Search quotes by selecting an author
app.get('/searchByAuthor', async (req, res) => {
  let userAuthorId = req.query.author;
  console.log(userAuthorId);
  let sql = `SELECT authorId, firstName, lastName, quoteId, quote, category, likes
            FROM q_quotes NATURAL JOIN q_authors 
            WHERE authorId = ?`;
  let params = [userAuthorId];
  let rows = await executeSQL(sql, params);
  res.render("results", {"quotes":rows});
});

// Search quotes by selecting a category
app.get('/searchByCategory', async (req, res) => {
  let category = req.query.category;
  console.log(category);
  let sql = `SELECT DISTINCT authorId, firstName, lastName, quoteId, quote, category, likes
            FROM q_quotes NATURAL JOIN q_authors 
            WHERE category = ?`;
  let params = [category];
  let rows = await executeSQL(sql, params);
  res.render("results", {"quotes":rows});
});

// Search quotes by number of likes
app.get('/searchByLikes', async (req, res) => {
  let likes = req.query.likesNum;
  console.log(likes);
  if (likes > 9999999999) {
    likes = 9999999999;
  }
  let sql = `SELECT authorId, firstName, lastName, quoteId, quote, category, likes
            FROM q_quotes NATURAL JOIN q_authors 
            WHERE likes = ?`;
  let params = [likes];
  let rows = await executeSQL(sql, params);
  res.render("results", {"quotes":rows});
});

// Get information of an author from databse by authorId
app.get('/api/author/:id', async (req, res) => {
  let authorId = req.params.id;
  let sql = `SELECT *
            FROM q_authors
            WHERE authorId = ? `;           
  let rows = await executeSQL(sql, [authorId]);
  res.send(rows)
});
  
//functions
async function executeSQL(sql, params){
  return new Promise (function(resolve, reject) {
    pool.query(sql, params, function (err, rows, fields) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(rows);
    });
  });
}

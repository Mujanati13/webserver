const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
// Create a MySQL connection
app.use(cors());

const connection = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12601165",
  password: "g6RkgQX775",
  database: "sql12601165",
});

// Connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL server: " + error.stack);
    return;
  }
  console.log("Connected to MySQL server as ID " + connection.threadId);
});

// Define a route that queries the database
app.get("/", (req, res) => {});


app.get("/api/absence", (req, res) => {
  const userId = req.query.userId;
  var query = "select * from absence where user_id =" + userId;

  connection.query(query, (err, docs) => {
    if (docs) {
      res.send(JSON.stringify(docs));
    }
  });
});

app.get("/api/presence", (req, res) => {
  const userId = req.query.userId;
  var query2 = "select * from presence where user_id =" + userId;

  connection.query(query2, (err, docs1) => {
    if (docs1) {
      res.send(JSON.stringify(docs1));
    }
  });
});

app.get("/api/session", (req, res) => {
  var query2 = "select * from session";
  connection.query(query2, (err, docs1) => {
    if (docs1) {
      res.send(JSON.stringify(docs1));
    }
  });
});

app.get("/api/sessionAdmin", (req, res) => {
  var userId = req.query.userId;
  console.log(userId);
  var query2 =`select * from session where session_id = '${userId}'`
  connection.query(query2, (err, docs1) => {
    if (docs1) {
      console.log(docs1);
      res.send(JSON.stringify(docs1));
    }else{
      console.log(err);
    }
  });
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

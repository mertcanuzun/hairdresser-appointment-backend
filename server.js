const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "63788986",
  database: "final-app",
});
app.get("/", (req, res) => {
  res.json({ message: "welcome to hairdresser appointment application" });
});
// app.get("/finalapp", (req, res) => {
//   if (err) throw err;
//   con.query(
//     "SELECT name, address FROM customers",
//     function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     }
//   );
// });

app.post("/sign-up", (req, res) => {
  const sql = "INSERT INTO user (`name`,`email`,`password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    err ? res.json("Error") : res.json(data);
  });
});

app.post("/sign-in", (req, res) => {
  const sql = "SELECT * FROM user WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    err ? res.json("Error") : "";

    if (data.length > 0) return res.json("succes");
    else return res.json("fail");
  });
});

app.get("/staffs", (req, res) => {
  const sql = "Select s.Id, s.Name from staffs s";

  res.json(sql);
});

app.listen(8081, () => {
  console.log("listening 8081");
});

//MERTUZNB\SQLEXPRESS

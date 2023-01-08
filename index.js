const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'password',
      database: 'employee_trackerdb'
    },
    console.log(`Connected to the movies_db database.`)
  );
  
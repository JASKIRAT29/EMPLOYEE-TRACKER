const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');

// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'Thechamp@1',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_trackerdb database.`)
);

connection.connect(function (err) {
  if (err) throw err
  console.log("Connected as Id" + connection.threadId)
  startPrompt();
});
function startPrompt() {
  const startQuestion = [{
    type: "list",
    name: "option",
    message: "what would you like to do?",
    choices: [
      "View all employees",
      "View all roles",
      "View all departments",
      "add an employee",
      "add a role",
      "add a department",
      "update role for an employee",
      "update employee's manager",
      "view employees by manager",
      "delete a department",
      "delete a role",
      "delete an employee",
    ]
  }]
  inquirer.prompt(startQuestion)
    .then(function (result) {
      console.log("You entered: " + result.option);

      switch (result.option) {
        case "View all employees":
          viewEmployee();
          break;
        case "view all roles":
          viewRoles();
          break;
        case "View all department":
          viewDepartment();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        case "add an employee":
          addNewEmployee();
          break;
        case "update role for an employee":
          updateRole();
          break;
        case "view employees by manager":
          viewEmployeeByManager();
          break;
        case "update employee's manager":
          updateManager();
          break;
        case "delete a department":
          deleteDepartment();
          break;
        case "delete a role":
          deleteRole();
          break;
        case "delete an employee":
          deleteEmployee();
          break;
        default:
          connection.end();
      }
    })
    .catch(err => {
      console.error(err);
    });
}
//All of the corresponding functions found below

function addDepartment() {


  inquirer.prompt({

    type: "input",
    message: "What is the name of the department?",
    name: "deptName"

  }).then(function (answer) {



    connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function (err, res) {
      if (err) throw err;
      console.table(res)
      startScreen()
    })
  })
}


function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the name of the role?",
        name: "roleName"
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salaryTotal"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "deptID"
      }
    ])
    .then(function (answer) {


      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function (err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "eeFirstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "eeLastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
      }
    ])
    .then(function (answer) {


      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function (err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
      });
    });
}
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "eeUpdate"
      },

      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
      }
    ])
    .then(function (answer) {

      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updateRole, answer.eeUpdate], function (err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
      });
    });
}

function viewDepartment() {
  // select from the db
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function viewRoles() {
  // select from the db
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function viewEmployee() {
  // select from the db
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

function quit() {
  connection.end();
  process.exit();
}
// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

// TODO: Create an array of questions for user input
const mainQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "All Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  },
];

const departmentQs = [
  {
    type: "input",
    message: "What is the name of the new department?",
    name: "name",
  },
];

const roleQs = [
  {
    type: "input",
    message: "What is the name of the new role?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the salary for the new role?",
    name: "name",
  },
  {
    type: "input",
    message: "Which department is it a part of?",
    choices: "name",
  },
];

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(mainQuestion).then((response) => {
    displaychoice(response.choice);
  });
}

function displaychoice(choice) {
  switch (choice) {
    case "View All Employees":
      response = viewEmployees();
      break;
    case "Add Employee":
      response = addEmployee();
      break;
    case "Update Employee Role":
      response = updateEmployee();
      break;
    case "View All Roles":
      response = viewRoles();
      break;
    case "Add Role":
      response = addRole();
      break;
    case "View All Departments":
      response = viewDepartments();
      break;
    case "Add Department":
      response = addDepartment();
      break;
    case "Quit":
      response = "";
      break;
  }
  return response;
}

function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    return init();
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    return init();
  });
}

function viewDepartments() {
  db.query(
    "SELECT * FROM department JOIN role ON department.",
    function (err, results) {
      console.table(results);
      return init();
    }
  );
}

function addEmployee() {
  inquirer.prompt(question).then((response) => {
    displaychoice(response.choice);
  });
}
function updateEmployee() {
  inquirer.prompt(question).then((response) => {
    displaychoice(response.choice);
  });
}

function addRole() {
  inquirer.prompt(question).then((response) => {
    displaychoice(response.choice);
  });
}

function addDepartment() {
  inquirer.prompt(departmentQs).then((response) => {
    const sql = `INSERT INTO department (name) VALUES ("${response.name}")`;
    db.query(sql, function (err, results) {
      console.log("New department added");
      return init();
    });
  });
}

// Function call to initialize app
init();

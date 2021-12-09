// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

let departments = [];
let employees = [];
let roles = [];

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

// TODO: Create an array of questions for user selection
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
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  },
];

//question to add a new department
const departmentQs = [
  {
    type: "input",
    message: "What is the name of the new department?",
    name: "name",
  },
];

//question to add a new role
const roleQs = [
  {
    type: "input",
    message: "What is the title of the new role?",
    name: "title",
  },
  {
    type: "input",
    message: "What is the salary for the new role?",
    name: "salary",
  },
  {
    type: "list",
    message: "Which department is it a part of?",
    name: "department",
    choices: departments,
  },
];

//question to add a new employee
const employeeQs = [
  {
    type: "input",
    message: "What is the employees first name?",
    name: "firstName",
  },
  {
    type: "input",
    message: "What is the employees last name?",
    name: "lastName",
  },
  {
    type: "list",
    message: "Which department is it a part of?",
    name: "role",
    choices: roles,
  },
  {
    type: "list",
    message: "Which department is it a part of?",
    name: "manager",
    choices: employees,
  },
];

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(mainQuestion).then((response) => {
    displaychoice(response.choice);
    return;
  });
}

//takes the initial selection and activates a new function based on choice
function displaychoice(choice) {
  switch (choice) {
    case "View All Employees":
      response = viewEmployees();
      break;
    case "Add Employee":
      response = generateAddEmployeeQs();
      break;
    case "Update Employee Role":
      response = updateEmployee();
      break;
    case "View All Roles":
      response = viewRoles();
      break;
    case "Add Role":
      response = generateDepartments();
      break;
    case "View All Departments":
      response = viewDepartments();
      break;
    case "Add Department":
      response = addDepartment();
      break;
    case "Quit":
      response = quit();
      break;
  }
  return response;
}

function quit() {
  prompt.ui.close();
  return;
}
//returns a table of all employees then replays the
function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    return init();
  });
}

//returns a table of all of the roles
function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    return init();
  });
}

//returns a table of all of the departments
function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    return init();
  });
}

//adds an employee to the database
function addEmployee() {
  inquirer.prompt(question).then((response) => {
    displaychoice(response.choice);
  });
}

//updates an employees information
function updateEmployee() {
  inquirer.prompt(question).then((response) => {
    displaychoice(response.choice);
  });
}

//adds a role to the database
function addRole() {
  inquirer.prompt(roleQs).then((response) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${response.title}", "${response.salary}", "${response.department}")`;
    db.query(sql, function (err, results) {
      console.log("New role added");
      return init();
    });
  });
}

//adds a department to the database
function addDepartment() {
  inquirer.prompt(departmentQs).then((response) => {
    const sql = `INSERT INTO department (name) VALUES ("${response.name}")`;
    db.query(sql, function (err, results) {
      console.log("New department added");
      return init();
    });
  });
}

//generates new questions for the
function generateDepartments() {
  departments = [];
  db.query("SELECT * FROM department", function (err, results) {
    results.forEach((department) => {
      departments.push(department.name);
    });
    roleQs[2].choices = departments;
    addRole();
  });
}

//generates new questions for the
function generateRoles() {
  roles = [];
  db.query("SELECT * FROM role", function (err, results) {
    results.forEach((role) => {
      roles.push(role.name);
    });
    employeeQs[3].choices = roles;
    addEmployee();
  });
}
//generates new questions for the
function generateEmployees() {
  employees = [];
  db.query("SELECT * FROM employee", function (err, results) {
    results.forEach((employee) => {
      employees.push(`${employee.first_name} ${employee.last_name}`);
    });
    employeeQs[3].choices = roles;
    addEmployee();
  });
}
generateAddEmployeeQs() {
  generateEmployees()
  generateRoles()
}

// Function call to initialize app
init();

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
const addRoleQs = [
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
    message: "Which role is he a part of?",
    name: "role",
    choices: roles,
  },
  {
    type: "list",
    message: "Who is his manager?",
    name: "manager",
    choices: employees,
  },
];

const changeRoleQs = [
  {
    type: "list",
    message: "Which employees role would you like to change?",
    name: "employee",
    choices: employees,
  },
  {
    type: "list",
    message: "What would you like their new role to be?",
    name: "role",
    choices: roles,
  },
];
const areYouSureQs = [
  {
    type: "list",
    message: "Are you Sure?",
    name: "choice",
    choices: ["yes", "no"],
  },
];

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(mainQuestion).then((response) => {
    if (response.choice === "Quit") {
      return;
    } else {
      displaychoice(response.choice);
      return;
    }
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
      response = generateUpdateEmployeeQs();
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

//work
//in
//progress
function quit() {
  prompt.ui.close();
  return;
}

//returns a table of all employees then replays the
function viewEmployees() {
  db.query(
    `SELECT employee.id, 
    CONCAT (employee.first_name, " ",
    employee.last_name) AS "employee name", 
    role.title AS "job title", 
    department.name AS department,
    role.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`,
    function (err, results) {
      console.table(results);
      return init();
    }
  );
}
//THEN I am presented with a formatted table showing employee data,
//including employee ids, first names, last names, job titles,
//departments, salaries, and managers that the employees report to

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

//uses the selected data from inquirer to prepare the data to be used to create a new employee
function prepareAddEmployee() {
  inquirer.prompt(employeeQs).then((response) => {
    let managerNames = response.manager.split(" ");
    let manager = "";
    let role = "";

    const roleSql = `SELECT id FROM role WHERE title = "${response.role}"`;
    const managerSql = `SELECT id FROM employee WHERE first_name = "${managerNames[0]}" AND last_name = "${managerNames[1]}"`;
    let employeeSql = ``;
    //searches the database for the id of the selected role
    db.query(roleSql, function (err, results) {
      console.log("role retrieved");
      role = results[0].id;
    });
    //searches the database for the selected managers id
    db.query(managerSql, function (err, results) {
      console.log("manager retrieved");
      manager = results[0].id;
      employeeSql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.firstName}", "${response.lastName}", ${role}, ${manager})`;
      return addEmployee(employeeSql);
    });
  });
}
//uses the data results to prepare data to update an employees role.
function prepareUpdateEmployee() {
  inquirer.prompt(changeRoleQs).then((response) => {
    let names = response.employee.split(" ");
    let employee = "";
    let role = "";

    const roleSql = `SELECT id FROM role WHERE title = "${response.role}"`;
    const employeeSql = `SELECT id FROM employee WHERE first_name = "${names[0]}" AND last_name = "${names[1]}"`;
    let sql = ``;
    //searches the database for the id of the selected role
    db.query(roleSql, function (err, results) {
      console.log("role retrieved");
      role = results[0].id;
    });
    //searches the database for the selected employees id
    db.query(employeeSql, function (err, results) {
      console.log("employee retrieved");
      employee = results[0].id;
      sql = `UPDATE employee Set role_id = ${role} WHERE id = ${employee};`;
      return updateEmployee(sql);
    });
  });
}

//Uses inputted data to create a new employee
function addEmployee(employeeSql) {
  db.query(employeeSql, function (err, results) {
    console.log(err);
    console.log("New employee added");
    return init();
  });
}

//updates an employees role in the db
function updateEmployee(sql) {
  db.query(sql, function (err, results) {
    console.log(err);
    console.log(results);
    console.log("Employee role updated");
    return init();
  });
}

//finds the id of the selected department
function prepareAddRole() {
  inquirer.prompt(addRoleQs).then((response) => {
    const deptSql = `SELECT id FROM department WHERE  name = "${response.department}"`;
    //searches the database for the id of the selected department
    db.query(deptSql, function (err, results) {
      console.log("department retrieved");
      department = results[0].id;
      roleSql = `INSERT INTO role (title, salary, department_id) VALUES ("${response.title}", "${response.salary}", "${department}")`;
      return addRole(roleSql);
    });
  });
}
//adds a role to the database
function addRole(sql) {
  db.query(sql, function (err, results) {
    console.log("New role added");
    console.log(err);
    console.log(results);
    return init();
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

//generates the departments to choose from when creating a new role.
function generateDepartments() {
  departments = [];
  db.query("SELECT * FROM department", function (err, results) {
    results.forEach((department) => {
      departments.push(department.name);
    });
    addRoleQs[2].choices = departments;
    prepareAddRole();
  });
}

//generates the choices to pick a role from for a new employee
function generateRoles() {
  roles = [];
  db.query("SELECT * FROM role", function (err, results) {
    results.forEach((role) => {
      roles.push(role.title);
    });
    employeeQs[2].choices = roles;
    changeRoleQs[1].choices = roles;
  });
}

//generates the choices to choose from as a manager for a new employee
function generateEmployees() {
  employees = [];
  db.query("SELECT * FROM employee", function (err, results) {
    results.forEach((employee) => {
      employees.push(`${employee.first_name} ${employee.last_name}`);
    });
    employeeQs[3].choices = employees;
    changeRoleQs[0].choices = employees;
  });
}

function areYouSure() {
  inquirer.prompt(areYouSureQs).then((response) => {
    if (response.choice === "no") {
      return init();
    } else {
      prepareUpdateEmployee();
    }
  });
}

//creates the questions to add an employee, then activates the questions.
function generateUpdateEmployeeQs() {
  generateEmployees();
  generateRoles();
  areYouSure();
}

//creates the questions to update an employee, then activates the questions.
function generateAddEmployeeQs() {
  generateEmployees();
  generateRoles();
  prepareAddEmployee();
}

// Function call to initialize app
init();

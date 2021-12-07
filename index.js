// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
// TODO: Create an array of questions for user input
const question = [
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

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(question).then((response) => {
    displaychoice(response.choice);
    writeToFile("GENERATEDREADME.md", markdown);
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

function viewEmployees() {}
function addEmployee() {}
function updateEmployee() {}
function viewRoles() {}
function addRole() {}
function viewDepartments() {}
function addDepartment() {}

// Function call to initialize app
init();

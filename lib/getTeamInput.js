const { prompt } = require("inquirer");

const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const Team = require("./Team");

// Globals
const currentIds = ["1", "44", "56"];

// Questions
const employeeQuestions = [
  {
    type: "input",
    name: "id",
    message: "Please enter and ID:",
    validate: function (input) {
      if (currentIds.includes(input)) {
        return "The ID is already in use. Please enter another.";
      } else if (/^[0-9]+$/.test(input)) {
        return true;
      } else {
        return "The ID can only contain numbers. Please enter only numbers.";
      }
    },
  },
  {
    type: "input",
    name: "name",
    message: "Please enter name:",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter email:",
    validate: function (input) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          input
        )
      ) {
        return true;
      } else {
        return "Please enter a valid email address.";
      }
    },
  },
];

const managerQuestions = [
  {
    type: "input",
    name: "officeNumber",
    message: "Please enter office number:",
    validate: function (input) {
      if (/^[0-9]+$/.test(input)) {
        return true;
      } else {
        return "Please enter only numbers.";
      }
    },
  },
];

const engineerQuestions = [
  {
    type: "input",
    name: "github",
    message: "Please enter GitHub username:",
  },
];

const internQuestions = [
  {
    type: "input",
    name: "school",
    message: "Please enter school name:",
  },
];

// Methods
const addManager = async () => {
  return await prompt(employeeQuestions.concat(managerQuestions))
    .then((ans) => {
      const manager = new Manager(
        ans.name,
        ans.id,
        ans.email,
        ans.officeNumber
      );
      return manager;
    })
    .catch((err) => {
      console.error("An error has occured getting answers!");
    });
};

const addEmployees = async (team) => {
  const testObj = new Manager("Joe", "222", "joe@contoso.com", "1223456988765");
  team.addEmployee(testObj);
};

const getTeamInput = async () => {
  const team = new Team();

  // add manager
  team.addEmployee(await addManager());

  // get employees
  addEmployees(team);

  // return team
  return team;
};

module.exports = getTeamInput;

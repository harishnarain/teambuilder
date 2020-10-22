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

const optQuestions = {
  manager: [
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
  ],
  engineer: [
    {
      type: "input",
      name: "github",
      message: "Please enter GitHub username:",
    },
  ],
  intern: [
    {
      type: "input",
      name: "school",
      message: "Please enter school name:",
    },
  ],
};

const employeeTypes = [
  {
    type: "list",
    name: "employeeType",
    message: "Which type of employee do you want to add?",
    choices: [
      {
        name: "Engineer",
        value: "engineer",
      },
      {
        name: "Intern",
        value: "intern",
      },
    ],
  },
];

const continueOptions = [
  {
    type: "list",
    name: "continueOption",
    message: "Add additional employees?",
    choices: [
      {
        name: "Yes",
        value: false,
      },
      {
        name: "No",
        value: true,
      },
    ],
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

const getEmployeeInput = async (employeeType) => {
  return await prompt(employeeQuestions.concat(optQuestions[employeeType]))
    .then((ans) => {
      currentIds.push(ans.id);
      switch (employeeType) {
        case "manager":
          const manager = new Manager(
            ans.name,
            ans.id,
            ans.email,
            ans.officeNumber
          );
          return manager;
        case "engineer":
          const engineer = new Engineer(
            ans.name,
            ans.id,
            ans.email,
            ans.github
          );
          return engineer;
        default:
          const intern = new Intern(ans.name, ans.id, ans.email, ans.school);
          return intern;
      }
    })
    .catch((err) => {
      console.error("An error has occured getting answers!");
    });
};

const addEmployees = async (team) => {
  let isComplete = false;
  while (!isComplete) {
    const employeeType = await prompt(employeeTypes)
      .then((ans) => ans.employeeType)
      .catch((err) => {
        console.error("An error has occured getting answers!");
      });

    team.addEmployee(await getEmployeeInput(employeeType));

    isComplete = await prompt(continueOptions)
      .then((ans) => ans.continueOption)
      .catch((err) => console.error("An error has occured getting answer!"));
  }
};

const getTeamInput = async () => {
  const team = new Team();

  // add manager
  console.log("===== Getting Manager Information =====");
  team.addEmployee(await getEmployeeInput("manager"));
  console.log("=======================================\n");

  // get employees
  console.log("===== Getting Employee Information =====");
  await addEmployees(team);
  console.log("=======================================\n");

  // return team
  return team;
};

module.exports = getTeamInput;

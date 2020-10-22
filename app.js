const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const welcomeUser = require("./lib/welcomeUser");
const { inherits } = require("util");
const getTeamInput = require("./lib/getTeamInput");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const init = async () => {
  // welcome message
  welcomeUser();

  // get employees and add to team object
  const team = await getTeamInput();

  // render team
  const renderedTeamOutput = render(team.getEmployees());
  console.log("[renderedTeamOutput]", renderedTeamOutput);

  // output team.html
};

init();

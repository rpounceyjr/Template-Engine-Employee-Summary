//The three Employee subclasses are required in
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//The necessary node libraries are brought in
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//render function used to create the team page is required in
//htmlRenderer.js
const render = require("./lib/htmlRenderer");
//questions asked in the inquirer prompts
const questionsArray = ["What is this team member's name?", "What is this team member's ID number?", "What is this team member's email?",
    "What is this team member's role?", "What is the office number?", "What is this team member's GitHub username?",
    "What is the name of this team member's school?"];
//The array to which employee objects are pushed after all 
//inquirer prompts are answered
const teamArray = [];

function createTeam() {
    inquirer
        .prompt([
            {
                type: "input",
                message: questionsArray[0],
                name: "name"
            },
            {
                type: "input",
                message: questionsArray[1],
                name: "id"
            },
            {
                type: "input",
                message: questionsArray[2],
                name: "email"
            },
            {
                type: "list",
                message: questionsArray[3],
                name: "role",
                choices: ["Manager", "Engineer", "Intern"]
            },
//The following three questions include a "when" function so they 
//are only asked for the relevant roles
            {
                type: "input",
                message: questionsArray[4],
                name: "officeNumber",
                when: function (answer) {
                    return answer.role === "Manager"
                }
            },
            {
                type: "input",
                message: questionsArray[5],
                name: "github",
                when: function (answer) {
                    return answer.role === "Engineer"
                }
            },
            {
                type: "input",
                message: questionsArray[6],
                name: "school",
                when: function (answer) {
                    return answer.role === "Intern"
                }
            }
        ]).then((response) => {
//the runAgain() function asks whether the user would like to add another
//team member.  If the answer is yes, create team is called again.
//If no, the render() function is called on the finished teamArray.
//This renderedTeamData is then passed to fs.writeFile which writes
//the data to the team.html page found in the output folder
            const runAgain = () => {
                inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "Would you like to add another team member?",
                            name: "runAgain",
                            choices: ["Yes", "No"]
                        }
                    ]).then((response) => {
                        if (response.runAgain === "Yes") {
                            console.log("Creating a new team member profile");
                            createTeam();
                        } else {
                            const renderedTeamData = render(teamArray);

                            fs.writeFile(outputPath, renderedTeamData, function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("Team page written!");
                                }
                            });;
                        }
                    })
            }
//Information gets passed from the inquirer response to the appropriate
//class.  After the employee object has been created it is pushed to 
//the teamArray and the runAgain() function is called.
            if (response.role === "Engineer") {
                const newEngineer = new Engineer(response.name, response.id, response.email, response.github);
                teamArray.push(newEngineer);
                runAgain();
            } else if (response.role === "Manager") {
                const newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
                teamArray.push(newManager);
                runAgain();
            } else {
                const newIntern = new Intern(response.name, response.id, response.email, response.school);
                teamArray.push(newIntern);
                runAgain();
            }
        }).catch((err) => console.log(err));
}


createTeam();
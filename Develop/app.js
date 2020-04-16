const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questionsArray = ["What is your name?", "What is your ID number?", "What is your email?",
    "What is your role?", "What is your office number?", "What is your GitHub username?",
    "What is the name of your school?"];
//push employee objects to this array

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//create function createTeam()
//function should ask which role is being created then 
//ask more questions depending on the role
//after receiving all input, it should plug responses into a 
//constructor for the appropriate class and push that object to the teamArray
//Then the app should ask if more team members need to be added, 
//run again if so. After all team members have been added, 
//call render() and pass in the teamArray with the team member objects
const teamArray = [];
async function createTeam() {
    await inquirer
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
            {
                type: "input",
                message: questionsArray[4],
                name: "officeNumber",
                when: function(answer){
                    return answer.role === "Manager"
                }
            },
            {
                type: "input",
                message: questionsArray[5],
                name: "github",
                when: function(answer){
                    return answer.role === "Engineer"
                }
            },
            {
                type: "input",
                message: questionsArray[6],
                name: "school",
                when: function(answer){
                    return answer.role === "Intern"
                }
            }
        ]).then((response) => {
            // console.log(response.role);
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
                            // console.log(teamArray);
                        
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

    // const renderArray = array => console.log(array);
    // renderArray(teamArray);
}
createTeam();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

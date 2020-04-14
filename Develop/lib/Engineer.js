// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    getRole() {
        return "Engineer";
    }
    getGithub() {
        return this.github;
    }

}

// const Roger = new Engineer('roger', 123, 'somethinghere', 'rpounceyjr');

// console.log(Roger.name);
// console.log(Roger.getGitHubUserName());
// console.log(Roger.id);
// console.log(Roger.email);

module.exports = Engineer;
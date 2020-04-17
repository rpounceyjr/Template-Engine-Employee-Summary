const Employee = require("./Employee");
//Engineer extends Employee class, adds a github property and getter,
//changes the returned value of getRole() to "Engineer"
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

module.exports = Engineer;
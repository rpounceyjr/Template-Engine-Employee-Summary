const Employee = require("./Employee");
//Intern extends Employee class, adds a school property and getter,
//changes the returned value of getRole() to "Intern"
class Intern extends Employee{
    constructor(name, id, email, school){
        super(name, id, email);
        this.school = school;
    }
    getRole(){
        return "Intern";
    }
    getSchool(){
        return this.school;
    }
}

module.exports = Intern;
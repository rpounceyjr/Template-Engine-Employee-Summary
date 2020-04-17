const Employee = require("./Employee");
//Manager class extends Employee class, adds an officeNumber property and getter,
//changes the returned value of getRole() to "Manager"
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole() {
        return "Manager";
    }
    getOfficeNumber() {
        return this.officeNumber;
    }

}


module.exports = Manager;
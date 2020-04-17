//Employee class from which Engineer, Intern, and Manager extend.
//Employee has properties of name, id, and email as well as 
//getters for each property and a getRole() method
class Employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return "Employee";
    }
}

module.exports=Employee;
// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
// Connect to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "EmployeeMS_DB"
});
connection.connect(err => {
    if (err) throw err;
    console.log('connected');
    runSearch();
});
// Ask initial set of questions and respond based on user answer
const runSearch = () => {
    inquirer.prompt({
        name: "queryType",
        message: "Would you like to query?",
        type: "list",
        choices: ["Add to database", "View database", "Update database"]
    }).then(answer => {
        switch (answer.queryType) {
            case "Add to database":
                add();
                break;
            case "View database":
                view();
                break;
            case "Update database":
                update();
                break;
            default:
                connection.end();
        }
    })
}
// view any of the three tables in the database
const view = () => {
    inquirer.prompt({
        name: "tableType",
        message: "What table would you like to view?",
        type: "list",
        choices: ["department", "role", "employee"]
    }).then(answer => {
        const query = `SELECT * FROM ${answer.tableType};`;

        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            runSearch();
        });
    });
}
// add to any of the three tables, and get asked a different set of questions based on answer
const add = () => {
    inquirer.prompt({
        name: "addType",
        message: "What would you like to add?",
        type: "list",
        choices: ["Add department", "Add role", "Add employee"]
    }).then(answer => {
        switch (answer.addType) {
            case "Add department":
                addDepartment();
                break;
            case "Add role":
                addRole();
                break;
            case "Add employee":
                addEmployee();
                break;
            default:
                connection.end();
        }
    })
}
// add to the department table
const addDepartment = () => {
    inquirer.prompt({
        name: "name",
        message: "What is the department name?",
        type: "input"
    }).then(answer => {
        const query = "INSERT INTO department (name) values (?);";

        connection.query(query, answer.name, (err, res) => {
            if (err) throw err;
            console.table(res);
            runSearch();
        });
    });
}
// add to the role table
const addRole = () => {
    inquirer.prompt([{
        name: "title",
        message: "What is the role title?",
        type: "input"
    }, {
        name: "salary",
        message: "What is the role's salary?",
        type: "input"
    }, {
        name: "id",
        message: "What is the role's department id?",
        type: "input"
    }
    ]).then(answer => {
        const query = "INSERT INTO role (title, salary, department_id) values (?, ?, ?);";

        connection.query(query, [answer.title, answer.salary, answer.id], (err, res) => {
            if (err) throw err;
            console.table(res);
            runSearch();
        });
    });
}
// add to the employee table
const addEmployee = () => {
    inquirer.prompt([{
        name: "first",
        message: "What is the employees first name?",
        type: "input"
    }, {
        name: "last",
        message: "What is the employees last name?",
        type: "input"
    }, {
        name: "id",
        message: "What is the employees role id?",
        type: "input"
    }
    ]).then(answer => {
        const query = "INSERT INTO employee (first_name, last_name, role_id) values (?, ?, ?);";

        connection.query(query, [answer.first, answer.last, answer.id], (err, res) => {
            if (err) throw err;
            console.table(res);
            runSearch();
        });
    });
}
// Update any given employee's role id
const update = () => {
    inquirer.prompt([{
        name: "employee",
        message: "What is the employees id that you want to update?",
        type: "input"
    }, {
        name: "role",
        message: "What do you want to set this employees role_id to?",
        type: "input"
    }
    ]).then(answer => {
        const query = "UPDATE employee SET role_id = ? WHERE id = ?;";

        connection.query(query, [answer.role, answer.employee], (err, res) => {
            if (err) throw err;
            console.table(res);
            runSearch();
        });
    });
}  
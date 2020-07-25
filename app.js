const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Mapleb0x",
  database: "top_songsDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connect on thread ${connection.threadId}`);
  initialPrompts();
});

function initialPrompts() {
  inquirer
    .prompt([
      {
        name: "action",
        message: "What do you want to do?",
        type: "list",
        choices: [
          "ARTIST SEARCH",
          "MULTI SEARCH",
          "RANGE SEARCH",
          "SONG SEARCH",
          "EXIT",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "ARTIST SEARCH":
          artistSearch();
          break;
        case "MULTI SEARCH":
          multiSearch();
          break;
        case "RANGE SEARCH":
          rangeSearch();
          break;
        case "SONG SEARCH":
          songSearch();
          break;
        default:
          connection.end();
          process.exit();
      }
    });
}

function artistSearch() {
  console.log("Searching artist...");
  initialPrompts();
}

function multiSearch() {
  console.log("Multisearching...");
  initialPrompts();
}

function rangeSearch() {
  console.log("Range searching...");
  initialPrompts();
}

function songSearch() {
  console.log("Song searching...");
  initialPrompts();
}

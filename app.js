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
  inquirer
    .prompt([
      {
        message: "Which artist are you looking for?",
        name: "artist",
      },
    ])
    .then((answer) => {
      connection.query(
        "SELECT position, artist, song, year FROM top5000 WHERE ?",
        { artist: answer.artist },
        (err, results) => {
          if (err) throw err;
          console.table(results);
          initialPrompts();
        }
      );
    });
}

function rangeSearch() {
  inquirer.prompt([
      {
        name: "beginning",
        type: "number",
        message: "Starting position?"
      },
      {
        name: "end",
        type: "number",
        message: "Ending position?"
      }
    ]).then(answers => {
      connection.query(
        "SELECT position, artist, song, year FROM top5000 WHERE position BETWEEN ? AND ?",
        [answers.beginning, answers.end],
        (err, results) => {
          if (err) throw err;
          console.table(results);
          initialPrompts();
        }
      );
    })
}

function multiSearch() {
  connection.query('SELECT artist, count(*) as countNum FROM top5000 GROUP BY artist HAVING countNum > 1 ORDER BY countNum DESC',
    (err, result) => {
        if (err) throw err;
        console.table(result)
        initialPrompts();
    }
  )
}

function songSearch() {
 inquirer.prompt([
     {
         message: 'Which song are you looking for?',
         name: 'song'
     }
 ]).then(answer => {
     connection.query(`SELECT position, artist, song, year FROM top5000 WHERE song LIKE "%${answer.song}%"`,
    (err, results) => {
        if (err) throw err;
        console.table(results)
        initialPrompts();
    })
 })
}

const readline = require('node:readline');
const fs = require('fs')
const { stdin: input, stdout: output } = require('node:process');
const { match } = require('node:assert');

const FILE = 'tasks.json'
if (fs.existsSync(FILE)) {
    try {
        // If the file exists, read it's contents (sync)
        const data = fs.readFileSync(FILE,utf8)
        // Parse json string into the todos array
        array = JSON.parse(data)
    } catch(e) {
        // If there is any error, start with empty array
        array = []
    }
}

const rl = readline.createInterface({ input, output });

const array = []

function askQuestion() { 
    rl.question("1. Add\n2. Delete\n3. Edit", answer => {
        switch(answer) {
            case "1":
                rl.question("What do you want to add?", answer => {
                    array.push(answer)
                    console.log(array)
                    askQuestion()
                });

                break;
            case "2":
                rl.question("What do you want to delete?\n" + array.toString.replaceAll(",", "\n"), answer => {
                    array.pop(answer)
                    console.log(array)
                })
        }
    });
}

askQuestion()
const readline = require('node:readline');
const fs = require('fs')
const { stdin: input, stdout: output, exit } = require('node:process');
const { match } = require('node:assert');
const taskDefault = ["", 0]

const FILE = 'tasks.json'
let array = []
if (fs.existsSync(FILE)) {
    try {
        // If the file exists, read it's contents (sync)
        const data = fs.readFileSync(FILE, 'utf8')
        // Parse json string into the todos array
        array = JSON.parse(data)
    } catch(e) {
        // If there is any error, start with empty array
        array = []
    }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function askQuestion() { 
    const tasksDisplay = array.map(task => task[1] === 0 ? `☐ ${task[0]}` : `☑ ${task[0]}`).join('\n');
    rl.question(`TODO:\n${tasksDisplay}\n__________________\n1. Add a task\n2. Delete a task\n3. Mark task done\n4. Exit\n`, answer => {
        answer = answer.trim()
        switch(answer) {
            case "1": // Add a task
                console.clear()
                rl.question("What do you want to add?\n", answer => {
                    array.push([answer, 0])
                    saveTasks()
                    console.clear()
                    askQuestion()
                });

            case "2": // Delete a task
                console.clear()
                const tasksList = array.map((task, index) => `${index + 1}. ${task[0]}`).join('\n');
                rl.question(`What do you want to delete? (Enter number)\n${tasksList}\n`, answer => {
                    const index = parseInt(answer) - 1;
                    if (index >= 0 && index < array.length) {
                        array.splice(index, 1)}})
            case "3":
                break
            case "4":
                console.log("Exiting...")
                exit()
            default:
                console.log("Invalid choice...")
                askQuestion()
        }
    });
}

//NOTE - Function to save tasks array to the tasks.json file
function saveTasks() {
    fs.writeFileSync(FILE, JSON.stringify(array, null, 2)) // Write the todos array as JSON
}
askQuestion()
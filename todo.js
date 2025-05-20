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

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

function displayTasks() {
    if (array.length > 0) {
        return array.map((task, index) => task[1] === 0 ? `${index + 1}.☐ ${task[0]}` : `${index + 1}.☑ ${task[0]}`).join('\n');
    }
    else {
        return "No tasks found."
    }
}
function decorate() {
    return "╒═══════════╕\n│ TODO List │\n╘═══════════╛"
}

function askQuestion() { 
    //const tasksDisplay = array.map(task => task[1] === 0 ? `☐ ${task[0]}` : `☑ ${task[0]}`).join('\n');
    let tasksList = []
    rl.question(`${decorate()}\n${displayTasks()}\n━━━━━━━━━━━━━\n1. Add a task\n2. Delete a task\n3. Mark task done\n4. Exit\n━━━━━━━━━━━━━\nChoose option (1-4):`, answer => {
        answer = answer.trim()
        switch(answer) {
            case "1": // Add a task
                console.clear()
                rl.question(`${decorate()}\n${displayTasks()}\n━━━━━━━━━━━━━\nWhat do you want to add?\nEnter name of task: `, answer => {
                    array.push([answer, 0])
                    saveTasks()
                    console.clear()
                    askQuestion()
                });

            case "2": // Delete a task
                console.clear()
                tasksList = array.map((task, index) => `${index + 1}. ${task[0]}`).join('\n')
                rl.question(`${decorate()}\n${displayTasks()}\n━━━━━━━━━━━━━\nWhat do you want to delete? (Enter number): `, answer => {
                    const index = parseInt(answer) - 1;
                    if (index >= 0 && index < array.length) {
                        array.splice(index, 1)}
                    saveTasks()
                    console.clear()
                    askQuestion()})
                    
                    
            case "3": // Mark done
                console.clear()
                tasksList = array.map((task, index) => `${index + 1}. ${task[0]}`).join('\n');
                rl.question(`${decorate()}\n${displayTasks()}\n━━━━━━━━━━━━━\nWhat do you want to mark as done? (Enter number): `, answer => {
                    const index = parseInt(answer) - 1;
                    if (index >= 0 && index < array.length) {
                        array[index][1] = 1
                    
                    saveTasks()
                    console.clear()
                    askQuestion()}})
                break
            case "4":
                console.log("Exiting...")
                exit()
            default:
                console.clear()
                askQuestion()
                console.log(" Invalid choice... Try again ")
        }
    });
}

//NOTE - Function to save tasks array to the tasks.json file
function saveTasks() {
    fs.writeFileSync(FILE, JSON.stringify(array, null, 2)) // Write the todos array as JSON

}
askQuestion()
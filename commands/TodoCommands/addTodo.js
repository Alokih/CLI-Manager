import inquirer from "inquirer";
import { connectDB, disconnectDB } from "../../db/connectdb.js";
import { Todo } from "../../schema/TodoSchema.js";

const inputDetails = async () => {
    const answers = await inquirer.prompt([
        { type: "input", name: "title", message: "Enter Title for the Todo: " },
        { type: "input", name: "description", message: "Enter the Details: " },
    ]);

    return answers;
};

const multipleInputs = async () => {
    const inputArray = [];

    while (true) {
        const input = await inputDetails();

        inputArray.push(input);
        const confirmationQns = await inquirer.prompt([
            {
                name: "confirm",
                message: "Do you want to add more Todos? ",
                type: "confirm",
            },
        ]);
        if (confirmationQns.confirm) {
            continue;
        } else {
            break;
        }
    }

    return inputArray;
};

const addTodo = async () => {
    try {
        const userInput = await multipleInputs();

        await connectDB();

        for (let i = 0; i < userInput.length; i++) {
            const input = userInput[i];

            await Todo.create(input);
        }

        console.log("Added Todos !");

        await disconnectDB();
    } catch (err) {
        console.log("Something went wrong, Error: ", err.message);
        process.exit(0);
    }
};

export default addTodo;

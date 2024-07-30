import { connectDB, disconnectDB } from "../../db/connectdb.js";
import { Todo } from "../../schema/TodoSchema.js";
import { askUniqueId } from "./deleteTodo.js";
import inquirer from "inquirer";

const updateDetails = async () => {
    try {
        const res = await inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "Enter new Title for Todo: ",
            },
            {
                name: "description",
                type: "input",
                message: "Enter new Details for Todo: ",
            },
            {
                name: "status",
                type: "list",
                choices: ["Pending", "Completed"],
                default: "todo.status",
                message: "Update status: ",
            },
        ]);

        return res;
    } catch (err) {
        console.log("Something went wrong, Error: ", err.message);
    }
};

const updateTodo = async () => {
    try {
        const uniqueId = await askUniqueId();

        await connectDB();

        const todo = await Todo.findOne({ uniqueID: uniqueId.uniqueID });

        if (!todo) {
            console.log("No Todo found with the given uniqueID !");
        } else {
            console.log(
                "Enter Details to update, Press Enter if you do not want to update details"
            );

            const details = await updateDetails();

            if (details.status === "Completed") {
                await Todo.deleteOne({ uniqueID: uniqueId.uniqueID });
                console.log("Deleted the Todo !");
            } else {
                await Todo.updateOne({ uniqueID: uniqueId.uniqueID }, details);
                console.log("Updated the Todo !");
            }
        }

        await disconnectDB();
    } catch (err) {
        console.log("Something went wrong, Error: ", err.message);
        process.exit(0);
    }
};

updateTodo();

export { updateTodo };

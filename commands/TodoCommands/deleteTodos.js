import { connectDB, disconnectDB } from "../../db/connectdb.js";
import { Todo } from "../../schema/TodoSchema.js";
import inquirer from "inquirer";

const askUniqueId = async () => {
    try {
        const res = await inquirer.prompt([
            {
                name: "uniqueID",
                type: "input",
                message: "Enter UniqueID of the Todo: ",
            },
        ]);

        res.uniqueID = res.uniqueID.trim();

        return res;
    } catch (err) {
        console.log("Something went wrong , Error: ", err.message);
    }
};

const deleteTodo = async () => {
    try {
        const userId = await askUniqueId();

        await connectDB();

        const res = await Todo.deleteOne({ uniqueID: userId.uniqueID });

        if (res.deletedCount === 0) {
            console.log(
                "Could not find any Todo matching the provided UniqueID !"
            );
        } else {
            console.log("Deleted Todo Succesfully !");
        }

        await disconnectDB();
    } catch (err) {
        console.log("Something went wrong, Error: ", err.message);
        process.exit(0);
    }
};

deleteTodo();

export { deleteTodo };

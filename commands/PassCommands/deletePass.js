import inquirer from "inquirer";
import { Password } from "../../schema/PassSchema.js";
import { connectDB, disconnectDB } from "../../db/connectdb.js";

const askWebsiteName = async () => {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "uniqueName",
            message: "Enter name of website to delete: ",
        },
    ]);

    return answer;
};

const deletePass = async () => {
    try {
        const input = await askWebsiteName();

        await connectDB();

        const res = await Password.deleteOne({ uniqueName: input.uniqueName });

        if (res.deletedCount === 0) {
            console.log("Could not find password for provided website name ");
        } else {
            console.log("Deleted Password succesfully !");
        }

        await disconnectDB();
    } catch (err) {
        console.log("Something went wrong, Error: ", err.message);
        process.exit(0);
    }
};

deletePass();
export { deletePass, askWebsiteName };

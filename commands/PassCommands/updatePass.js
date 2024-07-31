import { connectDB, disconnectDB } from "../../db/connectdb.js";
import { Password } from "../../schema/PassSchema.js";
import inquirer from "inquirer";

const askWebsiteName = async () => {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "uniqueName",
            message: "Enter name of website to update: ",
        },
    ]);

    return answer;
};

const updatePassDetails = async () => {
    const changedDetails = await inquirer.prompt([
        {
            type: "input",
            name: "uniqueName",
            message: "Enter updated name for the website: ",
        },
        {
            type: "input",
            name: "websiteLink",
            message: "Enter updated link of the website: ",
        },
        {
            type: "input",
            name: "email",
            message: "Enter the new Email: ",
        },
        {
            type: "password",
            name: "password",
            message: "Enter the new password to save: ",
        },
    ]);

    return changedDetails;
};

const updatePass = async () => {
    try {
        const ans = await askWebsiteName();

        await connectDB();

        const val = await Password.findOne({ uniqueName: ans.uniqueName });

        if (!val) {
            console.log("No Password found for this webites !");
        } else {
            console.log(
                "Enter new Details to update, Press Enter if you do not want to update details"
            );

            const newDetails = await updatePassDetails();

            await Password.updateOne(
                { uniqueName: newDetails.uniqueName },
                newDetails
            );
            console.log("Updated Password succesfully !");
        }

        await disconnectDB();
    } catch (err) {
        console.log("Something went wrong, Error: ", err.message);
        process.exit(0);
    }
};

export default updatePass;

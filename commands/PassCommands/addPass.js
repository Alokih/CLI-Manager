import inquirer from "inquirer";
import { Password } from "../../schema/PassSchema.js";
import { connectDB, disconnectDB } from "../../db/connectdb.js";

const inputDetails = async () => {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "uniqueName",
            message: "Enter name for the website: ",
        },
        {
            type: "input",
            name: "websiteLink",
            message: "Enter link of the website: ",
        },
        {
            type: "input",
            name: "email",
            message: "Enter the Email: ",
        },
        {
            type: "password",
            name: "password",
            message: "Enter the password to save: ",
        },
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
                type: "confirm",
                message: "Do you want to add more Passwords: ",
                name: "confirm",
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

const addPass = async () => {
    try {
        const res = await multipleInputs();

        await connectDB();

        for (let i = 0; i < res.length; i++) {
            const val = res[i];

            await Password.create(val);
        }

        console.log("Password Added succesfully !");
        await disconnectDB();
    } catch (err) {
        console.log("Something went wrong, Error: ", err.message);
        process.exit(0);
    }
};

addPass();

export { addPass };

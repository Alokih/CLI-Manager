import { connectDB, disconnectDB } from "../../db/connectdb.js";
import { Password } from "../../schema/PassSchema.js";

const listPass = async () => {
    try {
        await connectDB();

        const allPass = await Password.find({});

        if (allPass.length === 0) {
            console.log("No saved password found !");
        } else {
            allPass.length === 1
                ? console.log(`${allPass.length} password found !`)
                : console.log(`${allPass.length} password found !`);
            allPass.forEach((pass) => {
                console.log(
                    "Website Name: " +
                        pass.uniqueName +
                        "\n" +
                        "Webiste Link: " +
                        pass.websiteLink +
                        "\n" +
                        "Email: " +
                        pass.email +
                        "\n" +
                        "Password" +
                        pass.password +
                        "\n"
                );
            });
        }
        await disconnectDB();
    } catch (err) {
        console.log("Something went wrong, Error: ", err.message);
        process.exit(0);
    }
};

export default listPass;

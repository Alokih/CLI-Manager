import { connectDB, disconnectDB } from "../../db/connectdb.js";
import { Todo } from "../../schema/TodoSchema.js";

const listTodo = async () => {
    try {
        await connectDB();

        const todos = await Todo.find({});

        if (todos.length === 0) {
            console.log("No Todos Available !");
        } else {
            todos.length > 1
                ? console.log(`${todos.length} Todos found !`)
                : console.log(`${todos.length} Todo found !`);
            todos.forEach((todo) => {
                console.log(
                    "Todo ID: " +
                        todo.uniqueID +
                        "\n" +
                        "Title: " +
                        todo.title +
                        "\n" +
                        "Description: " +
                        todo.description +
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

export default listTodo;

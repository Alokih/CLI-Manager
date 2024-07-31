#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";

import addPass from "./commands/PassCommands/addPass.js";
import listPass from "./commands/PassCommands/listPass.js";
import updatePass from "./commands/PassCommands/updatePass.js";
import deletePass from "./commands/PassCommands/deletePass.js";
import addTodo from "./commands/TodoCommands/addTodo.js";
import listTodo from "./commands/TodoCommands/listTodo.js";
import updateTodo from "./commands/TodoCommands/updateTodo.js";
import deleteTodo from "./commands/TodoCommands/deleteTodo.js";

const program = new Command();

program
    .name("Cli-Manager")
    .description("Cli Tool to manage Todo & Passwords ")
    .version("1.0.0");

const chooseCategory = async () => {
    const { category } = await inquirer.prompt([
        {
            type: "list",
            name: "category",
            message: "What would you like to manage?",
            choices: ["Passwords", "Todos", "Exit"],
        },
    ]);

    if (category === "Exit") {
        console.log("GoodBye!");
        process.exit(0);
    }

    return category;
};

const setupCommands = (category) => {
    program.commands = [];

    if (category === "Passwords") {
        program
            .command("Add")
            .description("Add a new Password")
            .action(addPass);
        program
            .command("List")
            .description("List all Passwords")
            .action(listPass);
        program
            .command("Update")
            .description("Update a Password")
            .action(updatePass);
        program
            .command("Delete")
            .description("Delete a Password")
            .action(deletePass);
    } else if (category === "Todos") {
        program.command("Add").description("Add a new Todo").action(addTodo);
        program.command("List").description("List all Todos").action(listTodo);
        program
            .command("Update")
            .description("Update a Todo")
            .action(updateTodo);
        program
            .command("Delete")
            .description("Delete a Todo")
            .action(deleteTodo);
    }
};

const promptForCommand = async () => {
    const { command } = await inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "What would you like to do?",
            choices: ["Add", "List", "Update", "Delete", "Exit"],
        },
    ]);

    if (command === "Exit") {
        console.log("GoodBye!");
        process.exit(0);
    }

    return command;
};
const main = async () => {
    const category = await chooseCategory();

    setupCommands(category);

    console.log(
        `You've selected ${category}. Available commands: Add, List, Update, Delete`
    );

    const command = await promptForCommand();
    try {
        await program.parseAsync([process.argv[0], process.argv[1], command]);
    } catch (error) {
        console.error("Error executing command:", error.message);
    }

    console.log("Operation completed. Exiting program.");
    process.exit(0);
};

main().catch((error) => {
    console.error("An unexpected error occurred:", error.message);
    process.exit(1);
});

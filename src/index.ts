import inquirer from 'inquirer';
import chalk from "chalk";

import 
import { setOptions, getWorker, subscribeMessageAsync, ServiceOptions } from "estate-js";
import { ChatServer, ChatTextSaid } from "chat-service";

//hide the normally verbose logging
setOptions(new ServiceOptions(false, false));

const chatServer = getWorker(ChatServer, "Scott's No-kill Animal Shelter");

console.log(`Welcome to ${chalk.blueBright(chatServer.primaryKey)}!`)
console.log(chalk.grey(`The current server time is ${await chatServer.getTimeAsync()}.`));

const args = process.argv.slice(2);
if (args[0] === "--console") {
    console.log("Press Ctrl+C to exit.")
    const history = await chatServer.getHistoryAsync();
    if (history && history.length) {
        for (const chatText of history)
            outputChatText(chatText);
    }
    await subscribeMessageAsync(chatServer, ChatTextSaid, (chatTextSaid) => {
        outputChatText(chatTextSaid.chatText);
    });
} else {
    await inquirer.prompt([{
        type: 'input',
        name: 'userName',
        message: "Login: "
    }]).then(async ({userName}) => {
        console.log("Use /quit to exit chat.");
        while (true) {
            await inquirer.prompt([{
                type: 'input',
                name: 'text',
                message: `${userName}: `
            }]).then(async ({text}) => {
                if (text === "/quit") {
                    process.exit(0);
                    return;
                }
                await chatServer.sayAsync(userName, text);
            })
        }
    })
}

function outputChatText(chatText) {
    const timestamp = chalk.grey(`[${chatText.timestamp.toLocaleTimeString()}]`);
    const userName = chalk.whiteBright(`[${chatText.userName}]:`);
    const text = chalk.greenBright(chatText.text);
    console.log(`${timestamp} ${userName} ${text}`);
}
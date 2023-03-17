# ChatExample
Example real-time CLI-based chat application using the Estate real-time state manager. All messages are sent through a new service you create (named "Chat") hosted in the Estate cloud sandbox.

## Setup (1 minute)

Install Estate Tools
1. `npm install --global estate-tools`

Login to Estate

2. `estate login`

Choose "Continue as Guest" to remain anonymous if you prefer.

Checkout the repo:

3. `npx tiged estatejs/chat chat`

Init the Estate project:

4. `estate init`

Bring your Estate service online:

5. `estate up`

Install NPM modules

6. `npm install`

## Run the Chat Server and Client

Open a new terminal and start the console:

7. `node index.mjs --console`

Open a second terminal and start client 1. Enter any name when prompted. (For instance "Linus")

8. `node index.mjs`

Open a third terminal and start client 2. Enter another name when prompted. (For instance "Torvalds")

9. `node index.mjs`

# wp-ping

A RESTful API built with Node.js for automating WhatsApp interactions, using the [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) library.

Created by [Artur Holiv](https://github.com/arturholiv)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Testing with Postman](#api-testing-with-postman)

## Introduction

`wp-ping` is a Node.js server that leverages the `whatsapp-web.js` library to automate messaging and other interactions via WhatsApp. This API is designed for various automation purposes, such as sending messages, receiving messages, and responding to specific events on WhatsApp.

## Features

- WhatsApp automation using `whatsapp-web.js`
- RESTful API for sending and receiving WhatsApp messages
- Chat and contact management
- QR code generation and reading for authentication
- Built with Express.js
- CORS enabled for frontend integration

## Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arturholiv/wp-ping.git
   ```

2. Navigate to the project folder:
   ```bash
   cd wp-ping
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Project Structure

```bash
wp-ping/
│
├── src/
│   ├── config/
│   │   └── index.js           # Server and client configuration
│   │
│   ├── controllers/
│   │   ├── messageController.js  # Logic for sending and receiving messages
│   │   ├── chatController.js     # Logic for chat management
│   │   └── qrcodeController.js   # Logic for QR code generation
│   │
│   ├── routes/
│   │   ├── messageRoutes.js      # API routes for messages
│   │   ├── chatRoutes.js         # API routes for chats
│   │   └── qrcodeRoutes.js       # API routes for QR code
│   │
│   └── app.js                    # Express configuration and server initialization
│
├── index.js                      # Application entry point
├── package.json
└── README.md
```

## Running the Project (Backend)

To run the backend of the WhatsApp bot, follow these steps:

1. Start the server:
    ```bash
    npm start
    ```
2. The QR code will be displayed in the terminal upon startup. From that moment onward, the QR code will be regenerated every ´30 seconds` until it's scanned with your mobile device. To authorize the client, open WhatsApp on your phone, go to the settings, and scan the QR code. After the scan, the client should be authorized, and you'll see a Client is ready! message printed out in the terminal.


## API Testing with Postman

This project includes a Postman collection for easy API testing. To use it:

1. Install [Postman](https://www.postman.com/downloads/)
2. In Postman, click on "Import" in the top left corner
3. Choose "File" and select the `postman/wp-ping-api.postman_collection.json` file from this project
4. The collection "wp-ping API" will be imported with all available endpoints

Note: The collection uses a variable `{{base_url}}` set to `http://localhost:8080`. You may need to change this in the collection variables if your server is running on a different address.

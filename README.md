# wp-ping

A simple HTTP server built with Node.js using the [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) library for automating interactions with WhatsApp.

Created By [Artur Holiv](https://github.com/arturholiv)

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Project Structure](#project-structure)
-   [Running the project](#running-the-project)

## Introduction

`wp-ping` is a Node.js server that leverages the `whatsapp-web.js` library to automate messaging and other interactions via WhatsApp. This bot can be used for various automation purposes, such as sending messages, receiving messages, and responding to specific events on WhatsApp.

## Features

-   WhatsApp automation using `whatsapp-web.js`
-   RESTful API for sending and receiving WhatsApp messages
-   Built with Express.js
-   CORS enabled

## Installation

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### Steps

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
whatsapp-bot/
│
├── src/
│   ├── config/
│   │   └── index.js           # Server and client configuration
│   │
│   ├── controllers/
│   │   └── messageController.js # Logic for sending and receiving messages
│   │
│   ├── routes/
│   │   └── messageRoutes.js    # API routes for WhatsApp messaging
│   │
│   ├── services/
│   │   └── whatsappService.js   # WhatsApp logic using whatsapp-web.js
│   │
│   ├── app.js                  # Express server setup
│   └── index.js                # Entry point for the app
│
├── package.json
└── package-lock.json
```

## Running the Project (Backend)

To run the backend of the WhatsApp bot, follow these steps:

1. Start the server:
    ```bash
    npm start
    ```
2. The QR code will be displayed in the terminal upon startup. From that moment onward, the QR code will be regenerated every ´30 seconds` until it's scanned with your mobile device. To authorize the client, open WhatsApp on your phone, go to the settings, and scan the QR code. After the scan, the client should be authorized, and you'll see a Client is ready! message printed out in the terminal.

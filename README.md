# wp-ping

A simple HTTP server built with Node.js using the [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) library for automating interactions with WhatsApp.

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Project Structure](#project-structure)

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
├── package-lock.json
└── .env                        # Environment variables (optional)
```

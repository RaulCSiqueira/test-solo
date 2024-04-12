## React Book Tracker Project

## Overview

This project is a Book Tracker application built with React on the client side and Node.js, Json-server, and Express on the server side. The application allows users to track their reading progress, manage a personal library, and interact with various book-related features.

## Getting Started

* Client Side
Install Dependencies:

bash
npm install
Start Development Server:

bash
npm run start
Access the development environment at http://localhost:3000.

Build Project:

bash
npm run build
Create a production-ready build.

Server Side
Install Dependencies:

bash
npm install
Start Server:

bash
npm run start
Start the server environment.

bash
npm run start-dev
Start Server with Nodemon (Development):
Access the development environment at http://localhost:4000.

bash
npm run start-dev
Start the server with nodemon for automatic restarts during development.

## Tech Stack

* Client Side

React
Javascript
Typescript
Tailwind CSS
HTML
CSS

* Server Side

Node.js
Json-server
Express

## Project Structure
The project is structured as follows:

src: Contains the client-side source code.

components: React components used in different pages.

pages: Individual pages of the application (Home, Library, Book, Login, Register).

services: Services for handling API requests, authentication, etc.

server: Contains the server-side code.

db.json: JSON file used as a simple database for the Json-server.

server.js: Entry point for the Express server.


## Project Workflow

- Home Page: Landing page with project information and navigation options.
- Library Page: Accessible only to logged-in users, allows tracking reading progress and managing the book library.
- Book Page: Details of a specific book, accessible from the Library or search results.
- Login: Page for user authentication.
- Register: Page for creating a new user account.

## Authentication
- Only logged-in users can access the library and enjoy the full features of the application.
- Users need to create an account to track progress and add favorite books to their library.
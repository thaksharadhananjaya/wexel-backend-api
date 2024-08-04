# Wexel - Doctor consulting backend API

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)

## Introduction
Wexel - Doctor consulting backend API

## Features
- List your application's main features.
- Manage Users
- Manage Doctors
- Manage Appointments
- Manage Payments
- Authentication

## Prerequisites
Ensure you have the following software installed:
- Node.js (version 18.17.1)
- npm or pnpm
- TypeScript

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install the dependencies:
    ```bash
    npm install
    # or
    pnpm install
    ```

## Configuration
Provide instructions on how to configure the application. For example:
1. Create a `.env` file in the root directory following `sample.env`
   
2. Other configuration steps if necessary.

## Database Migration and Seeding
### Prisma Migration
1. Generate Prisma client (Optional):
    ```bash
    npx prisma generate
    ```

2. Run the migrations to set up your database schema:
    ```bash
    npx prisma migrate dev

## Running the Application
1. Compile the TypeScript code:
    ```bash
    npm run build
    # or
    pnpm build
    ```

2. Start the application:
    ```bash
    npm start
    # or
    pnpm start
    ```

3. The application should now be running at `http://localhost:3001`.

## API Documentation
- Swagger: Navigate to `http://localhost:3001/api/docs` to view the API documentation.



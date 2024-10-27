
# ToDo List App

A simple ToDo List application built with **React** and **Express** for managing tasks. Users can add, view, edit, and delete tasks, with a clean and modern UI inspired by MongoDB's design style and a violet-purple color scheme.

## Features

- **Add Tasks**: Add new tasks to the list using the input box.
- **View Tasks**: View all the tasks in a list format.
- **Edit Tasks**: Mark tasks as complete/incomplete by clicking the checkbox.
- **Delete Tasks**: Remove tasks from the list.

## Technologies Used

- **Frontend**: React, CSS (flexbox styling)
- **Backend**: Express.js, MongoDB (for data storage)

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine
- **MongoDB** server running locally or MongoDB Atlas account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app
   ```

2. Install dependencies for both the frontend and backend:
   ```bash
   npm install
   cd client
   npm install
   ```

3. Start MongoDB server (if running locally):
   ```bash
   mongod
   ```

4. Run the backend server:
   ```bash
   cd ..
   npm start
   ```

5. In a new terminal, run the frontend:
   ```bash
   cd client
   npm start
   ```

### API Endpoints

- **GET /get**: Fetch all tasks
- **POST /add**: Add a new task
- **PUT /update/:id**: Update a task by its ID
- **DELETE /delete/:id**: Delete a task by its ID

## Screenshots

![image](https://github.com/user-attachments/assets/fc79862c-0ce0-40a0-a392-dcafb0b7f824)



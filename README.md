Lab test 1 - Chat Application

This project is about integrating Socket.io into an application where users can chat together. There are multiple rooms which the user can join.

Index.html - This file consists of the webpage which acts as user interface. Here the user is authenticated and if it is a new user they can create a new user.

![Screenshot 2024-02-07 200014](https://github.com/Avengers82/101308905_lab_test1_chat_app/assets/100080715/70fa9ebb-1df1-4c83-9014-ffb58dc8b213)

Model.js - In this file, I defined the schemas for my database. To store the Username and their respective passwords to authenticate in the future. To store chat history of the chat in the rooms.

Routes.js - This file consists of routes that are used to trigger certain actions and what to do, when the user interacts with the application. For example, when clicking the login button it takes to the chat room, if clicked on disconnect it disconnects the user.

Script.js - This file is used to add functionality to application.

Server.js - This file consists of connection strings, it is important to connect to the database.

Style.css - This file has simple styling code for the Index.html

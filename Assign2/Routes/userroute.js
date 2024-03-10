const express = require('express');
const fs = require('fs');

// Create a new router instance
const routes = express.Router();

// Route to display a welcome message
routes.get('/', (req, res) => {
    res.send("Welcome to Nodejs Assignment 2!");
})

// Route to display a form for adding users
routes.get('/create', (req, res) => {
    res.send('<form action="/add" method="POST"><label for="userName">Enter UserName</label><br><input type="text" name="userName" placeholder="Enter user name"><br><button type="submit">Add User</button></form>');
});

// Route to handle adding a new user
routes.post('/add', (req, res) => {
    const userName = req.body.userName;
    // Append the new user to a text file
    fs.appendFile('users.txt', `${userName}\n`, (error) => {
        if (error) throw error;
        // Redirect to the '/users' route after adding the user
        res.redirect('/users');
    });
});

// Route to display a list of users
routes.get('/users', (req, res) => {
    // Read the contents of the 'users.txt' file
    fs.readFile("users.txt", "utf8", (err, data) => {
        if (err) {
            // If the file doesn't exist, redirect to the '/create' route
            res.redirect('/create');
        } else {
            // Split the data into an array of usernames and filter out any empty strings
            const users = data.split('\n').filter(Boolean);
            // Display the list of users as an HTML unordered list
            res.send(`<ul>${users.map(userName => `<li>${userName}</li>`).join('')}</ul>`);
        }
    });
});

// Export the router object for use in other modules
module.exports = routes;

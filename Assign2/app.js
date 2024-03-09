const express = require('express');
// const fs = require('fs');
const bodyparser = require('body-parser');

const userRoute = require('./Routes/userroute.js');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyparser.urlencoded({ extended: false }));

app.use( userRoute);

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});
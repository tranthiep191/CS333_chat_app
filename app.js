const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//bring in the routes
app.use("/user",require("./routes/user"));




const errorHandlers = require(".handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseError);

app.use("/chatroom", require("./routes/chatroom"));

module.exports = app;
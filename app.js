// require("dotenv/config");
require('dotenv').config()
const express = require("express");
const app = express();

require("./configs/mongoose.config");
require("./configs/middleware.config")(app);
require("./configs/locals.config")(app);
require("./configs/session.config")(app);
// app.locals.title = `Coasters App!`;

require("./routes")(app);

require("./error-handling")(app);

module.exports = app;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require("express");
const favicon = require("serve-favicon");
const logger = require("morgan");
const path = require("path");

// Middleware configuration
module.exports = (app) => {
  app.use(logger("dev"));
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "hbs");
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(favicon(path.join(__dirname, "..", "public", "images", "favicon.ico")));


  // To have access to `body` property in the request

  // Normalizes the path to the views folder

  // Handles access to the public folder

  // Handles access to the favicon
};

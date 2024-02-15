const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

const autoIncrement = require('mongoose-auto-increment'); // 2. require mongoose-auto-increment
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.patients = require("./patients.model.js")(mongoose);
db.history1 = require("./history1.model.js")(mongoose);
db.templates = require("./templates.model.js")(mongoose);

db.counters = require("./counters.model.js")(mongoose);

module.exports = db;
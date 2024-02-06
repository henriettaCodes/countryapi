const express = require("express")
const cors = require("cors")
const logger = require("./middleware/logger")

const app = express()
app.use(cors())
app.use(logger)

module.exports = app
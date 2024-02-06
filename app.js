const express = require("express")
const cors = require("cors")
const logger = require("./middleware/logger")
const cr = require("./routers/country-router")

const app = express()
app.use(cors())
app.use(logger)
app.use(express.json())

app.use("/countries", cr)

module.exports = app
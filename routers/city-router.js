const { Router } = require ('express')

const cic = require ("../controllers/city-controller")

const cir = Router()

//Define our routes

cir.get("/", cic.index)
cir.get("/:name", cic.show)
cir.post("", cic.create)
cir.delete("/:name", cic.destroy)
cir.patch("/:name", cic.update)

module.exports = cir 
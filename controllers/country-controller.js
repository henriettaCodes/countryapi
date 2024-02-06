const Country = require("../models/Country")

const index = async (req, res) => {
    try {
        const data = await Country.getAll()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
} 

const show = async (req, res) => {
    try{
        let name = req.params.name
        const country = await Country.getOneByCountryName(name)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const create = async(req, res) => {
    try{
        const data = req.body
        const newCountry = await Country.create(data)
        res.status(201).json(newCountry)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const destroy = async (req, res) => {
    try {
       const data = req.params.name 
       const country = await Country.getOneByCountryName(data)
       const result = await country.destroy()
       res.status(204).end()
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
module.exports = {index, show, create, destroy}
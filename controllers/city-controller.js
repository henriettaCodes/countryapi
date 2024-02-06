const City = require("../models/City")

const index = async (req, res) => {
    try {
        const data = await City.getAll()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
} 

const show = async (req, res) => {
    try{
        let name = req.params.name
        const city = await City.getOneByCityName(name)
        res.status(200).json(city)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const create = async(req, res) => {
    try{
        const data = req.body
        const newCity = await City.create(data)
        res.status(201).json(newCity)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const destroy = async (req, res) => {
    try {
       const data = req.params.name 
       const city = await City.getOneByCityName(data)
       const result = await city.destroy()
       res.status(204).end()
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const update = async (req, res) => {
    try {
        const data = req.body
        const country = await City.getOneByCityName(req.params.name)
        const result =  await city.update(data)
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
module.exports = {index, show, create, destroy, update}
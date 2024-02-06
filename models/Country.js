const db = require("../database/connect")

class Country {
    constructor({country_id, name, capital, population, languages, fun_fact, map_image_url}) {
      this.country_id = country_id
      this.name = name
      this.capital = capital
      this.population = population
      this.languages = languages
      this.fun_fact = fun_fact
      this.map_image_url = map_image_url
    }

    static async getAll() {
        const response = await db.query("SELECT name FROM country;")
        if (response.rows.length === 0) {
            throw new Error ("N0 countries in the database")
        }

        return response.rows.map(c => new Country(c))
    }

    static async getOneByCountryName(cn) {
        const response = await db.query("SELECT * FROM country WHERE LOWER (name) = LOWER($1);", [cn])
        if(response.rows.length != 1) {
            throw new Error("Cannot get country")
        }

        return new Country(response.rows[0])
    }
    static async create(data) {
        const {name, capital, population, languages} = data
        const ec = await db.query("SELECT name FROM country WHERE LOWER(name) = LOWER($1);", [name])
        
        if (ec.rows.length > 0) {
            throw new Error("Country already exists")
        }

        let response = await db.query("INSERT INTO country (name, capital, population, languages) VALUES ($1, $2, $3, $4) RETURNING *;", [name, capital, population, languages])
        return new Country(response.rows[0])
    }

    async destroy() {
        let response = await db.query("DELETE FROM country WHERE name = $1 RETURNING *;", [this.name])
        return new Country(response.rows[0]) 
    }

    async update(data){
        if(!data.name || !data.capital || !data.population || !data.languages){
            throw new Error("Required key is null")
        }
        let response = await db.query("UPDATE country SET name = $1, capital = $2, population = $3, languages = $4, fun_fact = $5, map_image_url = $6 WHERE name = $7 RETURNING *;",[data.name, data.capital, data.population, data.languages, data.fun_fact, data.map_image_url, this.name])
        return new Country(response.rows[0])
    }

  }
  
  module.exports = Country;
const db = require("../database/connect")

class City {
    constructor({city_id, name, population, country}) {
      this.city_id = city_id
      this.name = name
      this.population = population
      this.country = country
    }

    static async getAll() {
        const response = await db.query("SELECT name FROM city;")
        if(response.rows.length === 0){
            throw new Error("No countries found in database.")
        }
        return response.rows.map(c => new City(c))
    }

    static async getOneByCityName(name) {
        const response = await db.query("SELECT * FROM city WHERE LOWER(name) = LOWER($1);", [name])
        if(response.rows.length != 1){
            throw new Error("Cannot find a specific city.")
        }
        return new City(response.rows[0])
    }

    static async create(data){
        const {name, population, country} = data
        const ec = await db.query("SELECT name FROM city WHERE LOWER(name) = LOWER($1);", [name])
        if(ec.rows.length > 0){
            throw new Error("City already exists in database.")
        }
        let response = await db.query("INSERT INTO city (name, population, country) VALUES ($1, $2, $3) RETURNING *;", [name, population, country])
        return new City(response.rows[0])
    }

    async destroy(){
        let response = await db.query("DELETE FROM city WHERE LOWER(name) = LOWER($1) RETURNING *;", [this.name])
        return new City(response.rows[0])
    }

    async update(data){
        if(!data.name || !data.population || !data.country){
            throw new Error("Required key is null")
        }
        let response = await db.query("UPDATE city SET name = $1, population = $2, country = $3 WHERE name = $4 RETURNING *;",[data.name, data.population, data.country, this.name])
        return new City(response.rows[0])
    }
}
  
module.exports = City;
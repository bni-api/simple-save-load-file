import fs from 'fs'

const get = (req, res) => {
    try {
        res.json(JSON.parse(fs.readFileSync("save.json")))
    } catch (error) {
        console.log(error.message)
    }
    
}

const mapFunctions = {
    GET: get
}

export default (req, res) => {
    mapFunctions[req.method](req, res)
}
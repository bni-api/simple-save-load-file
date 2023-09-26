import fs from 'fs'

const post = (req, res) => {
    try {
        fs.writeFileSync("save.json", JSON.stringify(req.body))
        res.json({ message : "Customers data has been saved successfully." })
    } catch (error) {
        console.log(error.message)
    }
    
}

const mapFunctions = {
    POST: post
}

export default (req, res) => {
    mapFunctions[req.method](req, res)
}
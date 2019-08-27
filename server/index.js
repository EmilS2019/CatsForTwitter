const express = require('express')
const cors = require('cors')
const {isEmpty} = require('./mewValidation')
const monk = require('monk')
const Filter = require('bad-words')
const rateLimit = require('express-rate-limit')

const app = express()
app.use(cors())
app.use(express.json())

const db = monk(process.env.MONGO_URI || 'localhost/meower')
const mews = db.get('mews')

filter = new Filter() 

app.get('/', (req, res) =>{
    res.json({
        message: 'msssdeower 😸'
    })
})

app.get('/mews', (req, res) =>{
    mews.find().then(mews =>{
        res.json(mews)
    })
})

app.use(rateLimit({
    windowMs: 5 * 1000,
    max: 3
}))

app.post('/mews', (req, res) =>{       
        
    console.log(req.body)
    if(isEmpty(req.body.name) === false && isEmpty(req.body.content) === false){
            
        const mew = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        }

        mews
            .insert(mew)
            .then(createdMew => {
                res.json(createdMew)
            })

    }
    else{
        res.status(422)      
        console.log("Name and Content is required")
        
    }      
})

//supervisor instead of nodemon supervisor supervisor supervisor
//supersvisor SUPERVISOR IT*S SUPERVISOR
app.listen(5000, () =>{
    console.log("listening on port 5000")
})
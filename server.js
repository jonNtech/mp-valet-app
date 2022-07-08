const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()

let db,
    count = 0,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'valet'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(client => { 
        console.log('Connected to Database')
        db = client.db(dbName)
    })
    .catch(error => console.log(error))      

    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cors())


    app.get('/', (req, res) => {
        db.collection('parkingLot').find().sort({spotNum: -1}).toArray()
        .then (data =>{
        res.render('index.ejs', {info: data})
        })
        .catch(error => console.log(error))
    })


    app.post('/addCar', (request, res) => {
    db.collection('parkingLot').insertOne({carBrand: request.body.carBrand, lisensePlate: request.body.lisensePlate, spotNum: request.body.spotNum})
    .then(result => {
        count ++
        console.log('Car Added')
        res.redirect('/')
    })
    .catch(error => console.log(error))
    })

    app.delete('/deleteCar', (req, res) => {
        db.collection('parkingLot').deleteOne({spotNum: req.body.spotNumber})
        .then (result => {
            count --
            console.log('Car Removed')
            res.json('Car Removed')
        })
        .catch(error => console.log(error))
    })


app.listen(process.env.PORT || PORT, () => {
    console.log('server is running, better go catch it')
})


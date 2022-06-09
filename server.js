const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'rap'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => { 
        console.log('Connected to Database')
        db = client.db(dbName)
    })    

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (req, res) => {
    db.collection('parkingLot').find().sort({spotNum: -1}).toArray()
    .then (data =>{
    res.render('index.ejs', {info: data})
    })
    .catch(error => console.log(error))
})


app.post('/addCar', (req, res) => {
    db.collection('parkingLot').insertOne({carBrand: request.body.carBrand, lisensePlate: request.body.lisensePlate, spotNum: request.body.spotNum})
    .then(result => {
        console.log('Car Added')
        res.redirect('/')
    })
    .catch(error => console.log(error))
})


// app.put('/addOneLike', (request, response) => {
//     db.collection('rappers').updateOne({stageName: request.body.stageNameS, birthName: request.body.birthNameS,likes: request.body.likesS},{
//         $set: {
//             likes:request.body.likesS + 1
//           }
//     },{
//         sort: {_id: -1},
//         upsert: true
//     })
//     .then(result => {
//         console.log('Added One Like')
//         response.json('Like Added')
//     })
//     .catch(error => console.error(error))

// })


app.delete('/deleteCar', (req, res) => {
    db.collection('parkingLot').deleteOne({spotNum: request.body.spotNum})
    .then (result => {
        console.log('Car Removed')
        res.json('Car Removed')
    })
    .catch(error => console.log(error))
})


app.listen(process.env.PORT || PORT, () => {
    console.log('server is running, better go catch it')
})

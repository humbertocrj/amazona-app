import express from 'express';
import data from './data.js'
const app = express();


app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.get('/', (req, res) => {
    res.send('It works!')
})

//Try to get environment port, if it doesn't exist use the default 5000'
const port = process.env.PORT ||5000

app.listen(port, (req, res) => {
    console.log('Server listening on port '+port)
})
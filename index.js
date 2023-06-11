const cors = require('cors');
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('server is running successfully')
})

// mongodb connection


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jle6tre.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        const ProuductCollection = client.db('FashionSite').collection('ProductCollections')
        const uploadCollections = client.db("FashionSite").collection("uploadCollections")

        app.get('/products', async (req, res) => {
            const query = {}
            const result = await ProuductCollection.find(query).toArray()
            res.send(result)
        })

        app.post('/uploadProduct', async (req, res) => {
            const upload = req.body
            const result = await uploadCollections.insertOne(upload)
            res.send(result)

        })
    }
    finally {

    }
}

run().catch(err => console.log(err))

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
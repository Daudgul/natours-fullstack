const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');

const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const DB = process.env.DATABASE;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(DB, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);




// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// }).then(con => {
//     console.log(con)
//     console.log('DB connection successful!')
// }).catch(error => {
//     // Handle the error
//     console.log("I am Error" , error)
//   });

const app = require('./app')

// console.log(process.env)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})


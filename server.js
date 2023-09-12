const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');

const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const DB = process.env.DATABASE;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(DB, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
//   async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);




mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log(con)
    console.log('DB connection successful!')
}).catch(error => {
    // Handle the error
    console.log("I am Error" , error)
  });

  const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true
    },
    rating: {
      type: Number,
      default: 4.5
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    }
  })

  const Tour = mongoose.model('Tour', tourSchema)

  const testTour = new Tour({
    name: 'The Hill Camper',
    price: 977,
    rating: 4.4
  })
  
  testTour.save().then(doc => {
    console.log(doc, 'this is doc')
  }).catch(err => {
    console.log("This is Schema Error:", err)
  })

const app = require('./app')

// console.log(process.env)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})


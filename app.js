const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

//MIDDLEWARES
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(`${__dirname}/public`))



app.use((req,res,next) => {
    console.log('Hello from the middleware')
    next();
})

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();

})

// ROUTES


app.use('/api/v1/tours' , tourRouter);
app.use('/api/v1/users' , userRouter);


// LISTNER

module.exports = app;




// app.get('/', (req, res) => {
//     res.status(200).json({message: 'Hello from the server side!', app: 'Natours'})
// })

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));



// app.get('/api/v1/tours', (req, res) => {
//    res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//         tours
//     }
//    })
// })

// app.get('/api/v1/tours/:id', (req, res) => {  // when we use : the route it become a varible we can use name/number anything there

//     console.log(req.params); // it store all the route varible like {id: '5', x: 'user'}

//     const id = req.params.id * 1;

//     if(id > tours.length) {
//         return res.status(404).json({
//             status : 'fail',
//             message: 'Invalid ID'
//         });
//     }

//     const tour = tours.find(el => el.id === id)

//    res.status(200).json({
//     status: 'success',
//     data: {
//         tour
//     }
//    })
// })

// app.post('/api/v1/tours', (req, res) => {

//     // console.log(req.body)

//     const newId = tours[tours.length - 1].id + 1;
//     const newTour = Object.assign({id: newId}, req.body);

//     tours.push(newTour)

//    fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     err => {
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 tour: newTour
//             }
//         });
//     }
//    );
//  });

//  app.patch('/api/v1/tours/:id', (req,res) => {

//     if(req.params.id * 1 > tours.length){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//            tour: '<Updataed tour here...>'
//         }
//     })
//  })

//  app.delete('/api/v1/tours/:id', (req,res) => {

//     if(req.params.id * 1 > tours.length){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }

//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
//  })


//  const getAllTours =  (req, res) => {
//     res.status(200).json({
//      status: 'success',
//      requestedAt: req.requestTime,
//      results: tours.length,
//      data: {
//          tours
//      }
//     })
//  }

//  const getTour =  (req, res) => {  // when we use : the route it become a varible we can use name/number anything there

//     console.log(req.params); // it store all the route varible like {id: '5', x: 'user'}

//     const id = req.params.id * 1;

//     if(id > tours.length) {
//         return res.status(404).json({
//             status : 'fail',
//             message: 'Invalid ID'
//         });
//     }

//     const tour = tours.find(el => el.id === id)

//    res.status(200).json({
//     status: 'success',
//     data: {
//         tour
//     }
//    })
// }

// const createTour = (req, res) => {

//     // console.log(req.body)

//     const newId = tours[tours.length - 1].id + 1;
//     const newTour = Object.assign({id: newId}, req.body);

//     tours.push(newTour)

//    fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     err => {
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 tour: newTour
//             }
//         });
//     }
//    );
//  }


//  const updateTour = (req,res) => {

//     if(req.params.id * 1 > tours.length){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//            tour: '<Updataed tour here...>'
//         }
//     })
//  }

//  const deleteTour = (req,res) => {

//     if(req.params.id * 1 > tours.length){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }

//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
//  }

//  const getAllUsers = (req,res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined!'
//     })
    
//  }

//  const createUser = (req,res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined!'
//     })
    
//  }

//  const getUser = (req,res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined!'
//     })
    
//  }

//  const updateUser = (req,res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined!'
//     })
    
//  }

//  const deleteUser = (req,res) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined!'
//     })
    
//  }

 //  app.get('/api/v1/tours', getAllTours)
 //  app.post('/api/v1/tours', createTour);
 //  app.get('/api/v1/tours/:id',getTour)
 //  app.patch('/api/v1/tours/:id', updateTour)
//  app.delete('/api/v1/tours/:id', deleteTour)


// const tourRouter = express.Router();
// const userRouter = express.Router();

// app.use('/api/v1/tours' , tourRouter);
// app.use('/api/v1/users' , userRouter);

// tourRouter.route('/').get(getAllTours).post(createTour);
// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// userRouter.route('/').get(getAllUsers).post(createUser)
// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

// const port = 3000;

// app.listen(port, () => {
//     console.log(`App running on port ${port}...`)
// })



const mongoose = require('mongoose');
const slugify = require('slugify');


const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true
    },
    slug: String,
    duration:{
        type: Number,
        required: ['A tour must have a duration']
    },
    maxGroupSize:{
        type: Number,
        required: ['A tour must have a group size']
    },
    difficulty:{
        type: String,
        required: ['A tour must have a difficulty']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuentity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']

    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select : false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    },
    description: String
  },{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

  tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
  });

  
//  DOCUMENT MIDDLEWARE: runs befor .save() and .create()
  tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
  })

  // Can use multiple middleware in this 
  // tourSchema.pre('save', function(next) {
  //   console.log('Will save document...')
  //   next();
  // })

  // THis is after call the middleware we use post
  // tourSchema.post('save', function(doc, next) {
  //   console.log(doc)
  //   next();
  // })

  //  QUERY MIDDLEWARE
  tourSchema.pre(/^find/, function(next) {
    this.find({ secretTour: { $ne: true } });

    this.start = Date.now();
    next()
  })

  // tourSchema.post(/^find/, function(doc,next) {
  //   console.log(`this took ${Date.now() - this.start} miilliseconds!`)
  //   next()
  // })

  //  AGGREGATION MIDDLEWARE
  tourSchema.pre('aggregate', function(next) {
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
    // console.log(this.pipeline())
    next();
  })

  const Tour = mongoose.model('Tour', tourSchema)

  module.exports = Tour;
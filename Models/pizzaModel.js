const mongoose=require('mongoose');

const pizzaSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    variants: [String],
    price: [{
      small: Number,
      medium: Number,
      large: Number
    }],
    category: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  });

const pizzaModel= mongoose.model('pizzas', pizzaSchema)
module.exports=pizzaModel
const express = require('express');
const db = require('./db')
const Pizza = require('./Models/pizzaModel')
const dotenv = require("dotenv");
const bodyParser = require("body-parser"); 
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const pizzasRoute = require('./Routes/pizzaRoutes')
const userRoute = require('./Routes/userRoute')
const ordersRoute = require('./Routes/ordersRoute')

app.get("/", (req, res) => {
    res.send("Server is running...")
})

app.use('/api/pizzas/', pizzasRoute)
app.use('/api/users/' , userRoute)
app.use('/api/orders/', ordersRoute)


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is runnig on port " + port)
})
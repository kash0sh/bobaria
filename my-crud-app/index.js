const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors");
const Product = require('./models/product.model.js')
const productRoute = require('./routes/product.route.js')
const orderRoute = require('./routes/order.route.js');

const app = express()



app.use(cors({ origin: "http://localhost:3001" }));


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute);


app.get('/', (req,res) => {
    res.send("hello form node api server")
});

mongoose.connect("mongodb+srv://kashish1:kashish@cluster0.qixq0.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")

.then(() => {
    console.log("connected to the database")
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log("connection failed")
});
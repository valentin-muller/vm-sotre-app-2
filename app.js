const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

const app = express()

require('dotenv').config()



//MONGO_URI=mongodb+srv://VM:<password>@@@vm-cluster.cdmbe.mongodb.net/VM-Cluster?retryWrites=true&w=majority
mongoose
  .connect(
    process.env.DATABASE,
    { useNewUrlParser: true },
    { useCreateIndex: true },
    { useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to the Database");
  });

    // middlewares
    app.use(morgan('dev'))
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(expressValidator());

    // routes middleware
    const authRoutes = require('./routes/auth')
    app.use("/api", authRoutes);

    const userRoutes = require('./routes/user')
    app.use("/api", userRoutes);

    const categoryRoutes = require('./routes/category')
    app.use("/api", categoryRoutes);
    
    const productRoutes = require('./routes/product')
    app.use("/api", productRoutes);


    const port = process.env.PORT || 8000
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
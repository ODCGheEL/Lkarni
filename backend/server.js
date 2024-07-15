require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const usersRoutes = require('./routes/usersRoutes');
const lkridiRoutes = require('./routes/lkridiRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use("/api/users", usersRoutes)
app.use("/api/lkridi", lkridiRoutes)

const PORT = process.env.PORT || 4000

async function startServer() {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB 👌");

        // Start the Express server
        app.listen(4000, () => console.log(`Server running on port: ${PORT}`));
    } catch (err) {
        console.error("Failed to connect to databases or start server", err);
    }
}

startServer();
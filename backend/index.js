const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");

const app = express();
mongoose.connect('mongodb://localhost:27017/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to User database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});

const UserSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('users', UserSchema);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get("/", (req, resp) => {
    resp.send("App is working");
});

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        if (result) {
            delete result.password;
            resp.status(201).send(result);
        } else {
            console.log("User already registered");
            resp.status(400).send("User already registered");
        }
    } catch (e) {
        resp.status(500).send({ message: "Something went wrong", error: e.message });
    }
});

app.listen(5000, () => {
    console.log("App is running on port 5000");
});
<<<<<<< HEAD
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database connected successfully');
})
.catch((error) => {
    console.error('Database connection error:', error);
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successful", user: user });
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.send({ message: "User already registered" });
        } else {
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.send({ message: "Successfully Registered, Please login now." });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});


app.listen(9002,() => {
    console.log("BE started at port 9002")
=======
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database connected successfully');
})
.catch((error) => {
    console.error('Database connection error:', error);
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successful", user: user });
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.send({ message: "User already registered" });
        } else {
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.send({ message: "Successfully Registered, Please login now." });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});


app.listen(9002,() => {
    console.log("BE started at port 9002")
>>>>>>> f179777 (Initial commit)
})
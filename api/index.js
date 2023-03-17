
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'thisisnotasecretkey';
// booking
// jC1wacc2Q7RZw7SK

app.use(express.json());
app.use(cookieParser());
// middleware
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5174',
    // origin: 'http://localhost:5174', 
    // can only have 1 origin
}));


// connect to MongoDB database, we need connection string 
// (dataservice tab, in cluster item, connect -> connect your application -> copy the connection string)
// and put connection string to env file

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

// endpoint
app.get('/test',(req,res) => {
    res.json('test.ok')
});

app.post('/register', async (req, res) => {
    const {name, email,password} = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
    // 422: Unprocessable content/Entity
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    // find user email
    if (userDoc) {
        // check password
        // but password is encrypted -> use compare function of bcrypt to check encrypted vs  orignal password
        const passwordIsCorrect = bcrypt.compareSync(password, userDoc.password);
        if(passwordIsCorrect){
            // create a JWT token
            // and send it back to user for them to use when call api again
            jwt.sign({
                email: userDoc.email, 
                id: userDoc._id,
            }, jwtSecret, {}, (err, token) => {
                if(err) throw err;
                // res.cookie('token', token).json('pass ok');    
                res.cookie('token', token, {secure: true, sameSite: 'none', }).json(userDoc);    
            });
        } else {
            res.status(422).json('incorrect');
        }
    } else {
        res.json('not found');
    }

})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        })
    } else {
        res.json(null);
    }
})

app.listen(4000);
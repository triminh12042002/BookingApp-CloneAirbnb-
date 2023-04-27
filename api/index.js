
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer')
const fs = require('fs');
const { error } = require('console');
require('dotenv').config();



const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'thisisnotasecretkey';
// booking
// jC1wacc2Q7RZw7SK

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
// middleware
app.use(cors({
    credentials: true,
    // origin: 'http://localhost:5173',
    origin: 'http://127.0.0.1:5173',
    // origin: 'http://localhost:5174', 
    // can only have 1 origin
}));


// connect to MongoDB database, we need connection string 
// (dataservice tab, in cluster item, connect -> connect your application -> copy the connection string)
// and put connection string to env file

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

// endpoint
app.get('/test', (req, res) => {
    res.json('test.ok')
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
    // 422: Unprocessable content/Entity
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    // find user email
    if (userDoc) {
        // check password
        // but password is encrypted -> use compare function of bcrypt to check encrypted vs  orignal password
        const passwordIsCorrect = bcrypt.compareSync(password, userDoc.password);
        if (passwordIsCorrect) {
            // create a JWT token
            // and send it back to user for them to use when call api again
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                // res.cookie('token', token).json('pass ok');    
                // res.cookie('token', token).json(userDoc);    
                res.cookie('token', token, { secure: true, sameSite: 'none', }).json(userDoc);
                // res.cookie('token', token, {secure: false, sameSite: 'lax', }).json(userDoc);    
            });
        } else {
            res.status(422).json('incorrect');
        }
    } else {
        res.json('can not find user');
    }

})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        })
    } else {
        res.json(null);
    }
})

app.post('/logout', (req, res) => {
    // reset token
    res.cookie('token', '').json(true)
})

// console.log({__dirname});
app.post('/upload-by-link', async (req, res) => {

    const { link } = req.body;
    const fileName = 'photo' + Date.now() + '.jpg'

    const options = {
        url: link,
        dest: __dirname + '/uploads/' + fileName,
    }
    await imageDownloader.image(options);
    res.json(fileName);
})

// endpoint for get static img in uploads folder
const upload = multer({ dest: 'uploads/' }) // photosMiddleware
app.post('/uploads', upload.array('photos', 100), (req, res) => {
    // console.log(req.files)
    const uploadedFiles = [];
    // console.log(req)
    // the path of the img file after send from client computer to server has change, 
    // also the extension is miss so can not open it
    // but their still a originalname which have their extension
    // so change the current path in the uploads folder to the correct file name
    for (let i = 0; i < req.files.length; ++i) {
        const { originalname, path } = req.files[i];
        const newPath = 'uploads/' + originalname;
        fs.renameSync(path, newPath);
        uploadedFiles.push(originalname);
    }
    res.json(uploadedFiles)
    // res.json(req.photos)
})

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, price,
        description, perks, extraInfo,
        checkInTime, checkOutTime, maxNumGuest
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id, price,
            title, address, photos: addedPhotos,
            description, perks, extraInfo,
            checkIn: checkInTime, checkOut: checkOutTime, maxGuest: maxNumGuest
        })
        res.json(placeDoc);
    })
})

// delete test place data
// Place.deleteMany({title: {$in: [""]}}).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

// get all place of 1 user by their id
app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        const placeData = await Place.find({ owner: id });
        res.json(placeData);
    });
});

// get a particular place infomation
app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
})

app.put('/places/', async (req, res) => {
    const { token } = req.cookies;
    const { id, title, address, addedPhotos, price,
        description, perks, extraInfo,
        checkInTime, checkOutTime, maxNumGuest,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, price,
                description, perks, extraInfo,
                checkIn: checkInTime, checkOut: checkOutTime, maxGuest: maxNumGuest
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
})

// get all place
app.get('/places', async (req, res) => {
    const allPlaceData = await Place.find();
    res.json(allPlaceData);
})

app.post('/bookings',  (req, res) => {
    const { place, checkIn, checkOut,
        numberOfGuests, name, phone, price
    } = req.body;
    Booking.create({
        place, checkIn, checkOut,
        numberOfGuests, name, phone, price
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
})
app.listen(4000);
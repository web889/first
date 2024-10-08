const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); 
const { submitform, loginform, getdata, submitFeedback} = require("./controllers/submitform");
const authMiddleware = require("./middleware/authentication"); 
const { connection } = require('mongoose');
const app = express();

const staticpath = path.join(__dirname, "./views");

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticpath));
app.use(cookieParser()); 


app.use(
    cors({
        origin: ["http://first-two-puce.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', submitform);
app.post('/login', loginform);
app.use(authMiddleware);
app.post('/submitfeedback',submitFeedback);
app.get('/logout', (req, res) => {
  res.clearCookie("token");
  res.json({ message: 'Successfully logged out' });
});





app.get("/home", (req, res) => {
    res.render('home');
});

app.get("/api/data", getdata);

app.listen(http://first-two-puce.vercel.app, () => {
    console.log('Server is live on http://localhost:8000');
});


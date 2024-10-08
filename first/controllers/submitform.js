const connection = require("../db/conn");
const jwt = require('jsonwebtoken');
const submitform = async (req, res) => {
    const { name, email, password } = req.body;
   

    const stm = 'INSERT INTO login (name, email, password) VALUES (?,?,?)';
    const values = [name, email, password];

    try {
        await connection.query(stm, values);
        console.log('Data is stored');
        res.send('Data is stored');
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
    }
};

const loginform = async (req, res) => {
    const { email, password } = req.body;

    try {
        const stm = 'SELECT * FROM login WHERE email = ? AND password = ?'; 
        const values = [email, password];
        const [rows] = await connection.query(stm, values);

        if (rows.length > 0) {
            const user = rows[0];
            console.log("User found");

            const token = jwt.sign({ id: user.id }, "secretKey", { expiresIn: '1h' });

            // Set the token in the cookie
            res.cookie('token', token, { 
                httpOnly: true, 
                secure: false, // Change to true if using HTTPS
                maxAge: 3600000,
                sameSite: 'None' // Important for cross-origin requests
            });

            // Log the token for debugging (this will be in the response headers, not request cookies)
            console.log("Token set:", token); 

            res.json({
                userName: user.name,
                message: "Login successful",
            });
        } else {
            res.status(401).send("User not found or invalid credentials");
        }

    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
    }
};




// Get Data
const getdata = async (req, res) => {
    const id = req.user.id; // Ensure this is correct
    const stm = 'SELECT * FROM login WHERE id = ?';
    const values = [id];

    try {
        const [rows] = await connection.query(stm, values);
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('An error occurred while retrieving data.');
    }
};

const submitFeedback = async (req, res) => {
    const id = req.user.id;
    const { rate, comment, recommend } = req.body;

    const getUserQuery = "SELECT name, email FROM login WHERE id = ?";
    const insertFeedbackQuery = "INSERT INTO feedback (name, email, rate, comment, recommend) VALUES (?, ?, ?, ?, ?)";

    try {
        
        const [userRows] = await connection.query(getUserQuery, [id]);
        if (userRows.length === 0) {
            return res.status(404).send("User not found");
        }

        const name = userRows[0].name;
        const email = userRows[0].email;

      
        const feedbackValues = [name, email, rate, comment, recommend];
        await connection.query(insertFeedbackQuery, feedbackValues);

        res.status(201).send("Feedback submitted successfully");
    } catch (error) {
        console.error(error); 
        res.status(500).send("An error occurred while submitting feedback");
    }
};




module.exports = { submitform, loginform, getdata ,submitFeedback};

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Dotenv = require("dotenv").config(); //create a .env file containing the passwords if running code locally

const transporter = nodemailer.createTransport( {
    service: "Zoho",
    auth: {
        user: "che@tang-se.com",
        pass: process.env.E_PASSWORD
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8080, () => {console.log("Server listening on port 8080");});

app.post('/sendemail', async (req, res) => {
    const message = "Dear Che,\n" + 
        "\nYou received a message from a customer. Below are the details:\n\n"
        + "Client: " + req.body.name + "\n"
        + "Email: " + req.body.email + "\n"
        + "Message:\n" + req.body.message;

    const options = {
        from: "tnthome@zohomail.com",
        to: "che@tang-se.com",
        subject: "ADU Home - New Message",
        text: message,
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(options, function (err, info){
            if (err)
            {
                reject(err);
            }
            else
            {
                resolve("email sent");
            }
        });
    });

    res.json(0);
});
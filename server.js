const express =require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app= express();
const nodemailer=require('nodemailer');

const PORT= process.env.PORT || 5000;

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/contactform.html')
});

app.post('/',(req,res)=>{
    console.log(req.body);
    const transporter=nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'himdee7@gmail.com',
            pass:'MS9571515056'
        }
    })

    const mailOptions={
        from: req.body.email,
        to:'himdee7@gmail.com',
        subject:`Message From ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sents'+ info.response);
            res.send('success')
        }
    })
});

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
});
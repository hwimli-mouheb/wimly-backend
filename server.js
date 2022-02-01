require('dotenv').config();
const fs=require('fs');
const express = require('express');
const nodemailer=require('nodemailer');

const fileUploald = require ('express-fileupload');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const app = express();
app.use(fileUploald());
app.use(express.static('uploads'));
console.log("first");

//test endpoint
app.get('/test',(req,res)=>{
    res.send('testing succeeded')
})
// Upload Endpoint
app.post('/upload', (req, res)=>{
    if(req.data === null){
        return res.status(400).json({
            msg :'No file uploaded'
        });
    }
    
    const file = req.files.file; 
    //const data =req.data;
    console.log(file);
   
    file.mv(`${__dirname}/uploads/${file.name}`,err=>{

        if(err){
console.error(err); 
return res.status(500).send(err);
        }
    })

  console.log("***********///////////**********");
  console.log(req.body);
  console.log("***********///////////**********");
  let mailOptions={
      from: req.body.email,
      to: process.env.EMAIL,
      subject: req.body.from,
      text : `firstname: ${req.body.firstname} \n
lastname: ${req.body.lastname} \n
company:  ${req.body.company} \n
position: ${req.body.position} \n
email:  ${req.body.email} \n
phone:  ${req.body.phone} \n
message: ${req.body.messageField}\n
momo momo`,

}
transporter.sendMail(mailOptions,async (err,data)=>{
if(err){
 console.log('Error occurs');
}else{
 console.log('email sent!!');
 
}

})



});
/*,
      attachments: [
          { filename: file.filename , path: file.p}
      ]
  }
  transporter.sendMail(mailOptions,function(err,data){
   if(err){
       console.log('Error occurs');
   }else{
       console.log('email sent!!');
   }
  })*/




app.listen(process.env.PORT || 5000,()=>console.log("server started "));
const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const path=require('path');
const app=express();
const port=8000;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
  
}
const contactSchema= new mongoose.Schema({
    name : String,
    phone : String,
    email : String,
    address : String,
    desc : String

});
const Contact = mongoose.model('Contact',contactSchema);




app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
 
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
 
})
app.post('/contact', (req, res)=>{
    const myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("<h1>The form has been successfully submitted</h1>");
        
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    })

   
 
})




app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
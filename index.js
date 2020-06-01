const express = require("express");
const path = require("path");
const port = 8001;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [{
    name: "Ankush",
    phone: "2121212"
  },
  {
    name: "STSK",
    phone: "2102939"
  },
  {
    name: "CN",
    phone: "988608"
  }

]


app.get('/practice', function (req, res) {
  return res.render('practice', {
    title: "Let us play with ejs"
  });
});


app.get('/', function (req, res) {

  return res.render('home', {
    title: "Contact List",
    contact_list: contactList
  });
})
app.post('/create-contact', function (req, res) {

  //contactList.push(req.body);
  Contact.create({
    name: req.body.name,
    phone: req.body.phone
  }, function (err, newContact) {
    if (err) {
      console.log('eroor in creating');
      return;
    }
    console.log('*****', newContact);
    return res.redirect('back');
  });


});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log('Yup!My Server is running on Port', port);
})


app.get('/delete-contact/', function (req, res) {
  
  let id = req.query.id;

  Contact.findByIdAndDelete(id,function(){
    if(err){
      console.log('error in deleting')
      return;
    }
    return res.redirect('back');

  })

});
const express = require ('express')
const path = require('path')
const bodyparser = require ('body-parser')

const router = require('./router')


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Define the folder where your EJS templates are located

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" folder




app.use('/route',router);

app.get('/', (req, res) => {
  res.render('base',{title: "Login System"});  
});

app.get('/register', (req, res) => {
  res.render('register');
});


app.listen(port,()=>{console.log('Listening to the server on http://localhost:3000')})


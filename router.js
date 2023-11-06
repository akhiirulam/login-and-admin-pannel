var express = require("express");
var router = express.Router();
const db = require("./adminServer");
const session = require ('express-session')
const {v4:uuidv4}=require('uuid');

const key=uuidv4();

router.use(session({
    secret:key,
    resave:false,
    saveUninitialized:false
  }))

  // Login user
router.post('/login', async (req, res) => {
    try {
        const check = await db.findOne({ email: req.body.email })
        if (check.password === req.body.password)
        {
            req.session.user = check.email;
            
                res.status(201).redirect("dashboard")
           
        }
        else {
            res.render('base',{out:"Incorrect credentials"})
        }
    } 
    catch (e) {
        res.render('base',{out:"Incorrect credentials"})
    }
})

//Register new user
router.post('/register', async (req, res) => {
    const existUser = await db.findOne({email:req.body.email})
    if(existUser)
    {
        res.send("user already exists.please choose diffrent user name")
    }
    else
    {
        try {
            // Data to be inserted
            const dataToInsert = {
              username: req.body.username,
              email: req.body.email,
              password: req.body.password
            };
        
            // Insert the data into the database
            const result = await db.insertMany(dataToInsert);
        
            if (result) {
              res.status(201).json({ message: 'Data inserted successfully' });
            } else {
              res.status(500).json({ error: 'Failed to insert data' });
            }
          } catch (error) {
            console.error('Error while inserting data:', error);
            res.status(500).json({ error: 'Failed to insert data' });
          }
    }
  });


//route for dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.render('dashboard')
    }
    else {
        res.send("Please sign in");
    }
});

//route for logout

router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.clearCookie('connect.sid');
        res.render('base', { logout: "Logout Successfully" });
      }
    });
  });
module.exports = router;
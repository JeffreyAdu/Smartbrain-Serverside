const express = require('express' );
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require( './controlers/register');
const signin = require('./controlers/signin');
const profile = require('./controlers/profile');
const image = require('./controlers/image');




const app = express();


app.use(express.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      ssl: process.env.DB_SSL === 'true' ? {
        rejectUnauthorized: false
      } : null,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    }
  });

// const db = knex({
//     client: 'pg',
//     connection: {
//     host: '127.0.0.1',
//     port: 5432,
//     user: 'postgres',
//     password: '1123',
//     database: 'smartbrain',
// },
// });

// console.log(db);
app.get('/', (req, res) =>{
    res.send('success!');
})


app.post('/signin', (req, res) =>{
    signin.handleSignin(req, res, db, bcrypt)

 
})

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
})  //Dependency injection



app.get('/profile/:id', (req, res) =>{
    profile.handleProfileGet(req, res, db);

    
})


app.put('/image', (req, res) => {
    image.handleImage(req, res, db);

})

app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res);

})



app.listen( process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
   
})

// process.env.PORT ||


/*
/ --> res = this is working 
/signin --> POST =success/fail
/register --> POST 
/profile/:userId --> GET =user
/image --> PUT --> user(increase entries  )

*/
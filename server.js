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
      host: 'dpg-co931b20si5c7395itt0-a.ohio-postgres.render.com',
      port: 5432,
      user: 'smartbraindb_8edd_user',
      password: 'Fpf2eQ9gtLcir4CZWkhg0VVR7aIHEG2l',
      database: 'smartbraindb_8edd',
    },
  });


console.log(db.connection.port);
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



app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
   
})



/*
/ --> res = this is working 
/signin --> POST =success/fail
/register --> POST 
/profile/:userId --> GET =user
/image --> PUT --> user(increase entries  )

*/
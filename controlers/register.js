const handleRegister = (req, res, db, bcrypt) =>{
    const {email, name, password} = req.body;
    const emailRegex = /\S+@\S+\.\S+/;

    if(!email || !name || !password) {        
        return res.status(400).json("Please fill the form well!")
    }else if (!emailRegex.test(email)){
        return res.status(400).json('Please try again!');
    }

    var hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        }).into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users').returning('*')
            .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date()
        }).then(
            user => {
                res.json(user[0]);
                console.log(user[0])
            }
        )
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }).catch(err => res.status(400).json('OOpsss Try again bro!'));
    
    
}

module.exports = {
    handleRegister: handleRegister
};
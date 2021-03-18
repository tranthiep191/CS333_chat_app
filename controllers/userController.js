const mongoose = require('mongoose');
const User = mongoose.model("User");
const sha256 = require('js-sha256');
const jwt = require('jwt-then');


exports.register = async (req,res) => {
    const {name,email, password} = req.body;

    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

    if(!emailRegex.test(email)) throw "email is not supported";

    if(password.length < 6) throw "password must be at least 6 characters long.";



    const user = new User({
        name, 
        email, 
        password: sha256(password + process.env.SALT),
    }); // encrypted with SHA256

    await user.save();

    res.json({
        message: "User registered Successfully!"
});
};
//create token
exports.login = async (req,res) => {
    const {email, password} = req.body;
    const user = await User.find({
        email,
        password: sha256(password + process.env.SALT),
    });

    if(!user) throw "email and password did not match";

    const token = await jwt.sign({id: user.id}, process.env.SECRET);

    res.json({
        message: "User logged in successfully",
        token,
    })
}; 


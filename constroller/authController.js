const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../model/User');

const accessTokenSecrete = process.env.ACCESS_TOKEN_SECRETE;



class AuthController {
    async signin (req, res) {

        //veryfying request

        const {
            name,
            email,
            password,
            confirm_password
        } = req.body;

        if(!name) return res.status(400).json({message : "Name is required"});
        if(!email) return res.status(400).json({message : "Email is required"});
        if(!password) return res.status(400).json({message: "Password is required"});
        if(!confirm_password) return res.status(400).json({message: "Confirm Password is required"});

        let user = null

        try {
            user = await Users.findOne({email: email})
        } catch (error) {
           return res.status(500).json({message: "Internal server error"})
        }
        if(user){
            return res.status(400).json({message: "Email already in use"})
        }

        if(password !== confirm_password){
            return res.status(400).json({message: "Password not mache"})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashP = await bcryptjs.hash(req.body.password, salt)

        try {
            user = await Users.create({
                name,
                email,
                password: hashP
            }) 
        } catch (error) {
            return res.status(500).json({message: "Internal server error"})
        }

        const accessToken = jwt.sign({_id: user._id, email: user.email}, accessTokenSecrete, {expiresIn: '1 days'});
        

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            path: '/'
        })

        return res.json({status: true, user, message: "Signed in."})


    }

    async login (req, res) {

        const {email, password} = req.body;

        if(!email) return res.status(400).json({message: "Email is required"});
        if(!password) return res.status(400).json({message: "Password is required"});

        let user = null;

        try {
            user = await Users.findOne({email});
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }

        if(!user) return res.status(400).json({message: "Email does not exist"});

        const match = await bcryptjs.compare(password, user.password);

        if(!match) return res.status(400).json({message: "Wrong Password"});

       
        const accessToken = jwt.sign({_id: user._id, email: user.email}, accessTokenSecrete, {expiresIn: '1 days'});
        

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            path: '/'
        })

        return res.json({status: true, user, message: "Logged in."})
        



    }

    async verify(req, res) {

        const {accessToken} = req.cookies;
        if(accessToken){

            let userData = null;
            try {
                userData = jwt.verify(accessToken, accessTokenSecrete)
            } catch (error) {
                return res.status(400).json({message: "Token Expired"});
            }
        
        if(userData){
            let user = await Users.findOne({_id: userData._id});
            return res.json({status: true, user, message: "Logged in."})
        }
        }else{
            res.json({auth: false})
        }

    }

    async logout(req, res){

        await res.clearCookie('accessToken', {path: '/'});

        res.json({isAuth: false, user: null});

    }
}

module.exports = new AuthController;
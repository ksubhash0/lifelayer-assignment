const Candidates = require('../model/Candidate');
const fs = require('fs');
const path = require('path');

class CandidateController {
    async create(req, res) {

        const {
            name,
            email,
            mobile,
            image
        } = req.body;

        if(!name) return res.status(400).json({message : "Name is required"});
        if(!email) return res.status(400).json({message : "Email is required"});
        if(!mobile) return res.status(400).json({message: "Mobile is required"});

        let imagePath = '';
        if(image){
            try {
                const buffer = Buffer.from(image.replace(/^data:image\/(png|jpg|jpeg|pdf);base64/, ''), 'base64');
                const fileExt = image.split(';')[0].split('/')[1];
                const filePath = `/uploads/${Date.now()}-${email}.${fileExt}`;
    
                fs.writeFileSync(path.resolve(__dirname, `..${filePath}`), buffer, {encoding: 'base64'}, (err, r) => {
                   console.log('...')
                })
    
                imagePath = `${process.env.BASE_URL}${filePath}`;
            } catch (error) {
                console.log(error);
                return res.status(500).json({message: "Error while uploading image"})
            }

        }
        

        let candidate = null;

        try {
            candidate = await Candidates.create({...req.body, user: req.user._id, portfolio: imagePath});
            return res.json({candidate})
        } catch (error) {
            return res.status(500).json({message: "Internal server error"}) 
        }

    }

    async update(req, res) {

        const {
            name,
            email,
            mobile,
            editImage
        } = req.body;

        if(!name) return res.status(400).json({message : "Name is required"});
        if(!email) return res.status(400).json({message : "Email is required"});
        if(!mobile) return res.status(400).json({message: "Mobile is required"});

        let imagePath = (await Candidates.findOne({_id: req.params.id})).portfolio;
        if(req.body.editImage){
            try {
                const buffer = Buffer.from(editImage.replace(/^data:image\/(png|jpg|jpeg|pdf);base64/, ''), 'base64');
                const fileExt = editImage.split(';')[0].split('/')[1];
                const filePath = `/uploads/${Date.now()}-${email}.${fileExt}`;
    
                fs.writeFileSync(path.resolve(__dirname, `..${filePath}`), buffer, {encoding: 'base64'}, (err, r) => {
                   console.log('...')
                })
    
                imagePath = `${process.env.BASE_URL}${filePath}`;
            } catch (error) {
                console.log(error);
                return res.status(500).json({message: "Error while uploading image"})
            }

        }
        

        let candidate = null;

        try {
            candidate = await Candidates.findOneAndUpdate({user: req.user._id, _id: req.params.id}, {$set: {...req.body, user: req.user._id, portfolio: imagePath}}, {returnDocument: 'after', upsert: false});
            return res.json({candidate})
        } catch (error) {
            return res.status(500).json({message: "Internal server error"}) 
        }

    }

    async get (req, res){

        const {page} = req.params;
        let skipCount = (page - 1) * 5;

        let filter = {}

        try {

            const candidateTotal = await Candidates.find({user: req.user._id});

            const candidates = await Candidates.find({user: req.user._id}).skip(skipCount).limit(5).populate('user')
            res.json({candidates, total: candidateTotal.length});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"})
        }
    }

    async getById (req, res){

        try {
            const candidate = await Candidates.findOne({_id: req.params.id, user: req.user._id}).populate('user');
            return res.status(200).json(candidate)
        } catch (error) {
            res.status(500).json({message: "Internal Server Error"})
        }

    }

    async deleteOne(req, res){
        try {
            const candidate = await Candidates.findOne({_id: req.params.id});
            if(!candidate) return res.status(400).json({message: "Already Deleted"});
            let deleted = await Candidates.findOneAndDelete({_id: req.params.id});
            return res.status(200).json({message: "Candidate Deleted"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}

module.exports = new CandidateController;
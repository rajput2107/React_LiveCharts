const express = require('express');
const router = express.Router();
const User  = require('../model/User');




router.get('/',
async(req,res)=>{
    try {
        const data1 = await User.find();
        res.json(data1);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
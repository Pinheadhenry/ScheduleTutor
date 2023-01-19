const express = require('express')
const Admin = require('../models/Schedule')
const router = express.Router()
const bcrypt = require('bcrypt')
const Schedule = require('../models/Schedule')

router.get('/:id', (req, res) => {
    res.render('admin', {id: req.params.id})
})
router.post('/:id', async (req, res) => {
    console.log("ran")
    try {
        const admins = await Schedule.findById(req.params.id)
        map = new Map();
        str = req.body.data.replace("\r", "")
        const rows = str.split("\n").map(row => row.trim());
        rows.map(row => {
            s = row.split(",").slice(1)
            for(i = 0; i < s.length; i+=3) {
                if (s[i] == "") {
                    s.splice(i,3);
                    i -= 3;
                }
            }
            map.set(row.split(",")[0], s)
        })
        //console.log(map)
        admins.data = map
        admins.save()
        console.log(admins)
    } catch (error) {
        console.log(error)
    }
})
router.post('/:id/delete', async (req, res) => {
    const admin = await Schedule.findById(req.params.id)
    admin.data = []
    admin.save()
    res.send({
        msg: 'deleted'
    })
})
router.get('/:id/getdata', async (req, res) => {
    const admins = await Schedule.findById(req.params.id)
    res.send({
        data: admins.data
    })
})
router.post('/:id/update', async (req, res) => {
    try {
        const admin = await Schedule.findById(req.params.id)
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        admin.username = req.body.username
        admin.password = hashedPass
        admin.save()
        res.redirect('/admin/' + req.params.id)
    } catch (error) {
        console.log(error)
    }  
})

module.exports = router
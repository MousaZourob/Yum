const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `uploads/`);
    },
    filename: function(req, file, cb) {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage }).single('image');

router.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log('Error: ', err);
            res.status(500).send({ success: false, error: 'Internal Server Error'});
        }
        res.status(200).send({ success: true, filename: req.file.filename });
    });
});

router.get('/get', function (req, res) {
    if (!req.body.filename) {
        res.status(400).send({ error: 'Missing file name'});
        return;
    }
    // we restrict the filename to alphanumeric characters and a period to prevent directory traversal attacks
    const imagePath = path.normalize(`${__dirname}/../uploads/${req.body.filename.replace(/[^a-zA-Z0-9\.]/, '')}`);
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).send({ error: 'Image could not be found'});
    }
});

module.exports = router;
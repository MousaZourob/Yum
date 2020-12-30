const router = require('express').Router();
const path = require('path');

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

module.exports = router;
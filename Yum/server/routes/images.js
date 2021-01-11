const router = require("express").Router();
const path = require("path");
const fs = require("fs");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("uploads/")) {
      fs.mkdirSync("uploads/");
    }
    cb(null, `uploads/`);
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage }).single("image");

router.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log("Error: ", err);
      res.status(500).send({ success: false, error: "Internal Server Error" });
    }
    res.status(200).send({ success: true, filename: req.file.filename });
  });
});

router.get("/get/:filename", function (req, res) {
  if (!req.params.filename) {
    res.status(400).send({ error: "Missing file name" });
    return;
  }
  // we restrict the filename to alphanumeric characters and a period to prevent directory traversal attacks
  const imagePath = path.normalize(
    `${__dirname}/../uploads/${req.params.filename.replace(/[^a-zA-Z0-9\.]/,"")}`
  );
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.sendFile(path.normalize(`${__dirname}/../assets/404.png`));
  }
});

module.exports = router;

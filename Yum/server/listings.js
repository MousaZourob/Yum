const express = require('express');
const router = express.Router();

router.get('/hello', function (res, req) {
    res.sendStatus(200);
});
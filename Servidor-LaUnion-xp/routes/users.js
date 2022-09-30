var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const path = require('path');
const multer = require('multer');

//configuramos multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/imgUsers'))
    },
    filename: (req, file, cb) => {
        const newFileName = file.fieldname + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
const upload = multer({storage:storage});

/* GET users listing. */
router.get('/login', usersController.login);

router.get('/register', usersController.register);
router.post('/register', upload.single("avatar"), usersController.RegisterUser);

module.exports = router;

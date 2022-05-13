const router=require('express').Router();

const {getAll,getOne,register,modify, deleteAll, deleteOne, login}=require('../controllers/user.controller');

const autha = require('../middlewares/autha');

router.get('/',getAll);
router.get('/:id',getOne);
router.post('/register',register);
router.patch('/:id',autha,modify);
router.delete('/:id',deleteOne);
router.post('/login',login);
// router.delete('/',deleteAll);
module.exports=router;
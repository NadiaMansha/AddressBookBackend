const express = require('express');
const router = express.Router();
const {getUsers,getUser,createUser,updateUser,deleteUser,loginUser}=require('../controllers/userController')
/* const {protect,authorize}=require('../middleware/auth')
router.use(protect)
router.use(authorize('admin')) */
router.route('/').get(getUsers).post(createUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)
router.route('/login').post(loginUser)
module.exports=router

import express from 'express';
import pool from '../config/db.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);

// update user live location
router.put('/:id/location',async (req,res)=>{
    try {
        const { latitude, longitude } = req.body;
        const userId = req.params.id;
        const query = 'UPDATE "Users" SET latitude = $1, longitude = $2 WHERE id = $3';
        const values = [latitude,longitude,userId]
         await pool.query(query, values);
        res.json({success: true})
    } catch (error) {
        console.log(error);
    }
   
})
// get user live location
router.get('/:id/location',async (req,res)=>{
    const id = req.params.id;
    const query = 'SELECT latitude, longitude FROM "Users" WHERE id = $1';
    const values = [id]
    const result = await pool.query(query, values);
    return res.json(result.rows[0]);
})

router.delete('/:id', userController.deleteUser);

export default router;

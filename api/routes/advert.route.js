import express from 'express'
import {createAdvert,deleteAdvert,updateAdvert,getAdverts,getUserAdverts,getAdvert} from '../controllers/Advertisment.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router=express.Router();

router.post('/create',verifyToken,createAdvert);
router.delete('/delete/:id', verifyToken,deleteAdvert);
router.post('/update/:id',verifyToken,updateAdvert);
router.get('/get/:id',getAdvert);
router.get('/get',getAdverts);
router.get('/myadverts/:id',getUserAdverts);

export default router;


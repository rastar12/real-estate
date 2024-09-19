import express from 'express'
import {createAdvert,deleteAdvert,updateAdvert,getUserAdverts, getSpecific, getAdverts, getAdvert} from '../controllers/Advertisment.controller.js'
import { verifyToken } from '../utils/verifyToken.js'


const router=express.Router();

router.post('/create',createAdvert);
router.delete('/delete/:id', verifyToken,deleteAdvert);
router.post('/update/:id',verifyToken,updateAdvert);
router.get('/get/:id',getAdvert);
router.get('/myadverts/:id',getUserAdverts);
router.get('/get',getAdverts);
router.get('/gett', getSpecific);


export default router;
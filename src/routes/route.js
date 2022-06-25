const express=require('express')
const router=express.Router();

const pdfController=("../controllers/pdfController")

router.post("/createLink",pdfController.createPdf);
router.get("/pdf",pdfController.findPdf)

module.exports=router;

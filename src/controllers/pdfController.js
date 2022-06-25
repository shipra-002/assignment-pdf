const pdfModel= require("../models/pdfModel")
const mongoose= require('mongoose')
const aws=require('aws-sdk')
const pdfParse= require('pdf-parse')
const pdfReader= require('pdfreader')

//-----------------------------------------------------------------------------//
aws.config.update(
    {
        accessKeyId: "AKIAY3L35MCRVFM24Q7U",
        secretAccessKey: "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",
        region: "ap-south-1"
    }
)


let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {

        let s3 = new aws.S3({ apiVersion: "2006-03-01" })

        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "group23/" + file.originalname,
            Body: file.buffer
        }
        console.log(uploadFile)
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }

            return resolve(data.Location)
        }
        )

    }
    )
}

//-----------------------------------------------------------------------------------------//

const createPdf= async function(req,res){
    try{
        let files = req.files
        if(files && files.length > 0){
            let uploadedFileURL = await aws.uploadFile(files[0])
            // return res.status(201).send({status: true, message: "file uploaded succesfully", data: uploadedFileURL})
            return uploadedFileURL
        }
        let {pdfName}=req.body
        let finalData={
            pdfName,
            pdfLink:uploadedFileURL
        }
        const newLink = await pdfModel.create(finalData)
        return res
        .status(201)
        .send({ status: true, mesage:' created', Data: newLink })
        // else{
        //     return res.status(400).send({status: false, message: "please enter pdf link" })
        // }
    }catch(error){
  return res.status(500).send({status: false, message: error.message })
    }
}

//
const findPdf= async function(req,res){
try{
    const pdfData = await pdfModel.find({pdf})

  return res.status(200).send({ status: true, message: "pdf data", data: pdfData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.createPdf=createPdf;
module.exports.findPdf=findPdf;


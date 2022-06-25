const mongoose= require('mongoose')

const pdfSchema= new mongoose.Schema({
    pdfLink:{
        type:String,
        required:true
    },
    pdfName:{
        type:String,
    },
},
{timestamps:true}
)
module.exports= mongoose.model('pdf', pdfSchema)
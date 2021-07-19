const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    quantity:Number,
    updated_at:{type:Date,default:Date.now}
})

module.exports=mongoose.model('Product',productSchema)
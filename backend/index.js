const express = require('express');
const cors = require('cors');//login error
require('./db/config');//add the mongoose connect
const User = require('./db/User')//user tabel schema 
const Product = require('./db/Product')//product tabel schema

const Jwt = require('jsonwebtoken')//jwt package to authentication security
const JwtKey = "e-com";//jwt key define

const app = express();//server setup

app.use(express.json());//convert to json formated
app.use(cors());//login error


//signup api
app.post('/signup', async(req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();//no show in postman password data
    delete result.password//no show in postman password data

    Jwt.sign({result},JwtKey,{expiresIn:"2h"},(err,token)=>{//set the jwt
        if(err){
            res.send({result:"something went wrong, Please try after sometime"})
        }
        res.send({result, auth: token})
    })
})

//login api
app.post("/login",async(req,res)=>{
    let user = await User.findOne(req.body).select("-password");//no show password in postman result
    if(req.body.password && req.body.email){//validation to add email and password filed
        if(user){
            //jwt authe
            Jwt.sign({user},JwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({result:"something went wrong, Please try after sometime"})
                }
                res.send({ user, auth: token})
            })
            
        }else{
            res.send("no user");
        }
    }else{
        res.send("no user");
    }
})

//products
app.post('/add-product',verifyt,async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save()
    res.send(result)
})

//list product
app.get('/product',verifyt,async(req,res)=>{
    let products = await Product.find();
    if(products.length>0){
        res.send(products)
    }else{
        res.send("no Product Found")
    }
})

//delete product
app.delete('/product/:id',verifyt,async(req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result);
})


//update(single ) product
app.get('/product/:id',verifyt,async(req,res)=>{
    try {
    const result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else {
        res.status(404).send({ message: "No Data Found" }); // Proper response for "No Data Found"
      }
    } catch (error) {
      res.status(500).send({ message: "Error fetching product", error: error.message }); // Handle errors
    }
})

//update Data
app.put("/product/:id",verifyt, async(req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set : req.body
        }
    )
    if(result){
        res.send(result)
    }else {
        res.status(404).send({ message: "No Data Update" }); // Proper response for "No Data Found"
      }
})


//seacrh api
app.get('/search/:key',verifyt, async(req,res) => {
    let result = await Product.find({
        "$or":[
            {name:{$regex: req.params.key,$options: "i"}},
            {price:{$regex: req.params.key,$options: "i"}},
            {company:{$regex:req.params.key,$options: "i"}},
            {category:{$regex: req.params.key,$options: "i"}}
        ]
    });
    //$options: "i" no case-insensitive.
    if (result && result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send({ message: "No Data Found" });
      }
})


//middelware
function verifyt(req,res,next){
    const token = req.headers['authorization']
    if(token){
        token2 = token.split(' ')[1];
        // console.log("middleware called",token2)
        Jwt.verify(token2, JwtKey,(err, valid)=>{
            if(err){

                res.status(401).send("please provide valid  token")
            }else{
                next()
            }
        })
    }else{
        res.status(403).send("please add token")
    }  
}

app.listen(5000);
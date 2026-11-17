const express = require("express")
const UserModel = require("../models/user")
const { default: mongoose } = require("mongoose")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const router = express.Router()
const jwtSecret="this_is_a_jwt_secret_key_to_encrypt"




const authVerifyToken=(req,res,next)=>
{
            const token=req.cookies.token
            if(!token) return res.json({msg:"token not found"})

            const decoded=jwt.verify(token,jwtSecret)

            const user=decoded

            req.user=user

            next()

}


// function authSessionMiddleware(req,res,next)
// {
//     if(req.session.user)
//     {
//         next()
//     }
//     else{
//         return res.json({auth:false,msg:"User not logged-In"})
//     }
// }


router.get("/logout",(req,res)=>{
    req.session.user=null
    res.json({auth:false,msg:"logout successfull"})
})


router.get("/",authVerifyToken, async function (req, res)   //localhost:5000/user
{
    const user=req.user
    const users=await UserModel.find()  // fetch all docs
    
    res.json({users,loginUser:user})
})


router.get("/:id",authVerifyToken, async function (req, res)   //localhost:5000/user/12
{

    const user= await UserModel.findById(new mongoose.Types.ObjectId(req.params.id))
    // console.log(user)
    res.json({user})
})

router.post("/auth", async function (req, res) {
    const loginDetails = req.body  // extracting payload from req.body
    console.log(loginDetails)
    // {email:"",password:""}
    try {
        const user = await UserModel.findOne({ email: loginDetails.email })
        console.log(user)
        if (!user) {
            return res.json({ msg: "login failed, email-id wrong", auth: false })
        }

        const isMatch=await bcrypt.compare(loginDetails.password,user.password)

        if (isMatch) {

           const signData={
            id:user._id,
            email:user.email,
            name:user.name
           }

           const token=jwt.sign(signData,jwtSecret,{expiresIn:"1h"})

           res.cookie("token",token,{
            maxAge:60*60*1000,
            httpOnly:true,
            secure:false,
            sameSite:"lax"})

            res.json({ msg: "login success", auth: true,user:signData,token })
        }
        else {
            res.json({ msg: "login failed, password wrong", auth: false })
        }
    }
    catch (err) {
        res.json({ msg: "server error " + err, auth: false })
    }
})



router.post("/", async function (req, res) {
    console.log(req.body)
    const hashPassword=await bcrypt.hash(req.body.password,10)
    const savedUser = await UserModel.create({...req.body,password:hashPassword})
    res.json({ user: savedUser, msg: "User Saved" })
    // res.json({msg:"User Saved"})
})

router.put("/",authVerifyToken, async function (req, res) {
        const {id,user}=req.body
      const updatedUser = await UserModel.findByIdAndUpdate(id,user)
      if(!updatedUser)
      {
        return res.status(404).json("user not found..")
      }
      res.json({ user: updatedUser, msg: "User updated`" })
   
})

router.patch("/",authVerifyToken, function (req, res) {
    res.send("Parital Update user")
})

router.delete("/:id",authVerifyToken, async function (req, res) {
   const user=await UserModel.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id))

   if(!user)
   {
    return res.status(404).json({msg:"Invalid user id! user not found.."})
   }

   res.json({msg:"User deleted.."})
   
})


module.exports = router
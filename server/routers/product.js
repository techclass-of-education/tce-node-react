const express=require("express")

const router=express.Router()

router.get("/",function(req,res)
{
    res.send("Fetch All products")
})

router.get("/:id",function(req,res)
{
    res.send("Fetch id product")
})

router.post("/",function(req,res)
{
    res.send("save product")
})

router.put("/",function(req,res)
{
    res.send("Update product")
})

router.patch("/",function(req,res)
{
    res.send("Parital Update product")
})

router.delete("/",function(req,res)
{
    res.send("Delete product")
})


module.exports=router

// module={
//     exports:router
// }

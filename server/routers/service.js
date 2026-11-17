const express=require("express")

const router=express.Router()

router.get("/",function(req,res)
{
    res.send("Fetch All services")
})

router.get("/:id",function(req,res)
{
    res.send("Fetch id service")
})

router.post("/",function(req,res)
{
    res.send("save service")
})

router.put("/",function(req,res)
{
    res.send("Update service")
})

router.patch("/",function(req,res)
{
    res.send("Parital Update service")
})

router.delete("/",function(req,res)
{
    res.send("Delete service")
})


module.exports=router

// module={
//     exports:router
// }

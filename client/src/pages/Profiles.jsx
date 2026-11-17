import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export function Profiles()
{
    const [profiles,setProfiles]=useState([])
    const navigate=useNavigate()

    function update(p)
    {
        navigate("/update",{state:p})
    }
    useEffect(function()
    {
        axios.get("http://localhost:5000/user",{withCredentials:true}).
        then(function(res)
        {
            setProfiles(res.data.users)
        })
    },[])


    return (<>
    
        {
            
            profiles.map(function(e){
                console.log(e)
                return (<li>{e.name} <button onClick={()=>update(e)}>Update</button> 
                <button>Delete</button></li>)
            })
        }
    
    </>)
}
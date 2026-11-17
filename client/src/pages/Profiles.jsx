import { useEffect, useState } from "react"
import axios from "axios"
export function Profiles()
{
    const [profiles,setProfiles]=useState([])

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
                return (<li>{e.name}</li>)
            })
        }
    
    </>)
}
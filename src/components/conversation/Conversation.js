import React, { useState ,useEffect} from 'react'
import './conversation.css'
import axios from 'axios'
const Conversation = ({conversation,currentUser}) => {
    const [user,setUser]=useState(null)

    const baseUrl="http://localhost:5600/api"

    useEffect(()=>{
        const friendId=conversation.members.find((m)=>m!==currentUser._id)

     const getUser=async()=>{
        try {
            const res=await axios.get(`${baseUrl}/users/allUsers?userId=`+friendId)
            setUser(res.data)
        } catch (error) {
            
        }
     }
     getUser()

    },[currentUser,conversation])
  return (
    <div className='conversation'>
        <div className='imgContainer'>
        <img
        className='conversationImg'
        src={user?.profileImg||"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
        />
        </div>  
      
        <span className='conversationName'>{user?.firstName}</span>
      
    </div>
  )
}

export default Conversation

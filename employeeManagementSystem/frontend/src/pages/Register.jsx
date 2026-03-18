import {useState} from "react"
import {useNavigate} from "react-router-dom"
import API from "../api/axios"
import {toast} from "react-toastify"

function Register(){

const navigate = useNavigate()

const [form,setForm]=useState({
 email:"",
 password:""
})

const handleSubmit = async(e)=>{

 e.preventDefault()

 try{

 await API.post("/auth/register",form)

 toast.success("Account created")

 navigate("/login")

 }catch(err){

 toast.error("Error creating account")

 }

}

return(

<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">

<div className="bg-white p-10 rounded-xl shadow-xl w-96">

<h2 className="text-2xl font-bold mb-6 text-center">

Create Account

</h2>

<form onSubmit={handleSubmit} className="space-y-4">

<input
placeholder="Email"
className="w-full border p-2 rounded"
onChange={(e)=>setForm({...form,email:e.target.value})}
/>

<input
type="password"
placeholder="Password"
className="w-full border p-2 rounded"
onChange={(e)=>setForm({...form,password:e.target.value})}
/>

<button className="w-full bg-green-600 text-white py-2 rounded">

Register

</button>

</form>

</div>

</div>

)

}

export default Register
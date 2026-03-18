import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../api/axios"
import { toast } from "react-toastify"

function Login(){

const navigate = useNavigate()

const [form,setForm] = useState({
 email:"",
 password:""
})

const handleSubmit = async(e)=>{
 e.preventDefault()

 try{

 const {data} = await API.post("/auth/login",form)

 localStorage.setItem("token",data.token)

 toast.success("Login successful")

 navigate("/dashboard")   // IMPORTANT

 }catch(err){

 toast.error("Invalid credentials")

 }

}

return(

<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">

<div className="bg-white p-10 rounded-xl shadow-xl w-96">

<h2 className="text-3xl font-bold mb-6 text-center">

Employee Manager

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

<button className="w-full bg-indigo-600 text-white py-2 rounded">

Login

</button>

</form>

<p className="text-center mt-4">

No account?

<Link to="/register" className="text-indigo-600 ml-2">

Register

</Link>

</p>

</div>

</div>

)

}

export default Login
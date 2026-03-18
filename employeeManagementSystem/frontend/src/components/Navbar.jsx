import {useNavigate} from "react-router-dom"

function Navbar(){

const navigate = useNavigate()

const logout = ()=>{

localStorage.removeItem("token")

navigate("/login")

}

return(

<div className="bg-white shadow flex justify-between items-center px-8 py-4">

<h1 className="text-xl font-bold text-indigo-600">

Employee Manager

</h1>

<button
onClick={logout}
className="bg-red-500 text-white px-4 py-1 rounded"
>

Logout

</button>

</div>

)

}

export default Navbar
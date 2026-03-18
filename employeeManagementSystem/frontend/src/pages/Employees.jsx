import {useEffect,useState} from "react"
import Layout from "../components/Layout"
import API from "../api/axios"
import {toast} from "react-toastify"

function Employees(){

const [employees,setEmployees] = useState([])

const [form,setForm] = useState({
name:"",
email:"",
department:"",
salary:""
})

const [search,setSearch] = useState("")
const [page,setPage] = useState(1)

const perPage = 5

const fetchEmployees = async()=>{

const {data} = await API.get("/employees")

setEmployees(data)

}

useEffect(()=>{
fetchEmployees()
},[])

const addEmployee = async(e)=>{

e.preventDefault()

try{

await API.post("/employees",form)

toast.success("Employee added")

setForm({
name:"",
email:"",
department:"",
salary:""
})

fetchEmployees()

}catch(err){

toast.error("Error adding employee")

}

}

const deleteEmployee = async(id)=>{

await API.delete(`/employees/${id}`)

toast.success("Employee deleted")

fetchEmployees()

}

const filtered = employees.filter(emp =>
emp.name.toLowerCase().includes(search.toLowerCase())
)

const start = (page-1)*perPage

const current = filtered.slice(start,start+perPage)

return(

<Layout>

<h2 className="text-3xl font-bold mb-6">

Employee Management

</h2>

{/* ADD EMPLOYEE FORM */}

<div className="bg-white shadow rounded-lg p-6 mb-8">

<h3 className="text-xl font-semibold mb-4">

Add Employee

</h3>

<form
onSubmit={addEmployee}
className="grid md:grid-cols-4 gap-4"
>

<input
placeholder="Name"
className="border p-2 rounded"
value={form.name}
onChange={(e)=>setForm({...form,name:e.target.value})}
/>

<input
placeholder="Email"
className="border p-2 rounded"
value={form.email}
onChange={(e)=>setForm({...form,email:e.target.value})}
/>

<input
placeholder="Department"
className="border p-2 rounded"
value={form.department}
onChange={(e)=>setForm({...form,department:e.target.value})}
/>

<input
placeholder="Salary"
className="border p-2 rounded"
value={form.salary}
onChange={(e)=>setForm({...form,salary:e.target.value})}
/>

<button className="bg-indigo-600 text-white rounded py-2">

Add Employee

</button>

</form>

</div>

{/* SEARCH */}

<input
placeholder="Search employees..."
className="border p-2 rounded mb-4 w-64"
onChange={(e)=>setSearch(e.target.value)}
/>

{/* EMPLOYEE TABLE */}

<div className="bg-white shadow rounded-lg">

<table className="w-full">

<thead className="bg-gray-200">

<tr>

<th className="p-3">Name</th>
<th>Email</th>
<th>Department</th>
<th>Salary</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{current.map(emp =>(

<tr key={emp._id} className="border-t">

<td className="p-2">{emp.name}</td>
<td>{emp.email}</td>
<td>{emp.department}</td>
<td>₹ {emp.salary}</td>

<td>

<button
onClick={()=>deleteEmployee(emp._id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>

Delete

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* PAGINATION */}

<div className="flex gap-2 mt-4">

{Array.from({
length:Math.ceil(filtered.length/perPage)
}).map((_,i)=>(

<button
key={i}
onClick={()=>setPage(i+1)}
className={`px-3 py-1 border ${
page===i+1 ? "bg-indigo-600 text-white" : ""
}`}
>

{i+1}

</button>

))}

</div>

</Layout>

)

}

export default Employees
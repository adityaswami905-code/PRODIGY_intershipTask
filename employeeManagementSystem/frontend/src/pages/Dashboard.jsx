import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import API from "../api/axios"

function Dashboard(){

const [employees,setEmployees] = useState([])

useEffect(()=>{

const fetchEmployees = async()=>{

const {data} = await API.get("/employees")

setEmployees(data)

}

fetchEmployees()

},[])

const totalEmployees = employees.length

const totalSalary = employees.reduce((sum,e)=>sum+Number(e.salary || 0),0)

const departments = new Set(employees.map(e=>e.department)).size

return(

<Layout>

<h1 className="text-3xl font-bold mb-8">

Dashboard Overview

</h1>

{/* STAT CARDS */}

<div className="grid md:grid-cols-3 gap-6 mb-10">

<div className="bg-white shadow rounded-lg p-6">
<h2 className="text-gray-500">Total Employees</h2>
<p className="text-4xl font-bold text-indigo-600">{totalEmployees}</p>
</div>

<div className="bg-white shadow rounded-lg p-6">
<h2 className="text-gray-500">Departments</h2>
<p className="text-4xl font-bold text-green-600">{departments}</p>
</div>

<div className="bg-white shadow rounded-lg p-6">
<h2 className="text-gray-500">Total Salary</h2>
<p className="text-3xl font-bold text-purple-600">
₹ {totalSalary}
</p>
</div>

</div>

{/* RECENT EMPLOYEES */}

<div className="bg-white shadow rounded-lg p-6">

<h2 className="text-xl font-bold mb-4">

Recent Employees

</h2>

<table className="w-full">

<thead className="bg-gray-200">

<tr>
<th className="p-2">Name</th>
<th>Email</th>
<th>Department</th>
<th>Salary</th>
</tr>

</thead>

<tbody>

{employees.slice(0,5).map(emp =>(

<tr key={emp._id} className="border-t">

<td className="p-2">{emp.name}</td>
<td>{emp.email}</td>
<td>{emp.department}</td>
<td>₹ {emp.salary}</td>

</tr>

))}

</tbody>

</table>

</div>

</Layout>

)

}

export default Dashboard
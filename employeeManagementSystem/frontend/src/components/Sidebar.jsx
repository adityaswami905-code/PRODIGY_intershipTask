import {Link} from "react-router-dom"

function Sidebar(){

return(

<div className="bg-indigo-700 text-white w-60 p-6">

<h2 className="text-2xl font-bold mb-8">

Admin Panel

</h2>

<div className="flex flex-col gap-4">

<Link
to="/dashboard"
className="hover:bg-indigo-600 p-2 rounded"
>

Dashboard

</Link>

<Link
to="/employees"
className="hover:bg-indigo-600 p-2 rounded"
>

Employees

</Link>

</div>

</div>

)

}

export default Sidebar
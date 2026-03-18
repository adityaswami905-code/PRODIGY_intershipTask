function Pagination({total,page,setPage}){

const pages = []

for(let i=1;i<=total;i++){

pages.push(i)

}

return(

<div className="flex gap-2 mt-4">

{pages.map(p=>(
<button
key={p}
onClick={()=>setPage(p)}
className={`px-3 py-1 border ${p===page ? "bg-indigo-600 text-white" : ""}`}
>

{p}

</button>
))}

</div>

)

}

export default Pagination
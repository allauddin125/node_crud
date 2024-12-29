import {useState} from 'react'
import {addP} from '../api/api'
import {useNavigate} from 'react-router-dom'
const Addproduct = () => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
   const [product,setProduct] = useState({
    name:'',
    price:'',
    category:'',
    company:'',
    userId: userId
   })

   const addproduct = async () =>{
    try{
        const res = await addP(product)
        setProduct({name:'',category:'',company:'',userId:'',price:''})
        console.log(res);
        navigate("/");
    }catch(error){
        console.log(error)
    }
   }
   const navigate = useNavigate();
    const add = () =>{
        // console.log(product);
        addproduct()
       
    }
  return (
    <div className="main">
        <h1>Add Products</h1>
        <input type="text" className="inbox" placeholder="Name" value={product.name}  onChange={(e)=>setProduct({...product, name:e.target.value})}/>
        <input type="text" className="inbox" placeholder="Price" value={product.price} onChange={(e)=>setProduct({...product, price:e.target.value})}/>
        <input type="text" className="inbox" placeholder="Category" value={product.category} onChange={(e)=>setProduct({...product, category:e.target.value})}/>
        <input type="text" className="inbox" placeholder="Company" value={product.company} onChange={(e)=>setProduct({...product, company:e.target.value})}/>
        <button onClick={add}>Add Product</button>
      
    </div>
  )
}

export default Addproduct

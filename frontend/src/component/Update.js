import {useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {preP,upP} from '../api/api'

const Update = () => {
    const [product,setProduct] = useState({
       name:'',
       price:'',
       category:'',
       company:'',
      })

useEffect(()=>{
    getProduct()
},[])
const {id} = useParams();
const getProduct = async()=>{
    try{
        const res = await preP(id)
        setProduct(res.data)
        // console.log(res)
    }catch(error){
       console.log(error)       
    }
}
const navigate = useNavigate();
const update = async() =>{
    // console.log(product);
   try{
    const res = await upP(id,product)
    console.log(res.data)
    navigate("/")
   }catch(error){
    console.log(error)
   }
}
  return (
    <div className="main">
      <h1>Update id</h1>
      <input type="text" placeholder='Enter Name' className='inbox' value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})}/>
      <input type="text" placeholder='Enter Price' className='inbox' value={product.price} onChange={(e)=>setProduct({...product,price:e.target.value})}/>
      <input type="text" placeholder='Enter Category' className='inbox' value={product.category} onChange={(e)=>setProduct({...product,category:e.target.value})}/>
      <input type="text" placeholder='Enter Company' className='inbox' value={product.company} onChange={(e)=>setProduct({...product,company:e.target.value})}/>
      <button onClick={update}>Update</button>

    </div>
  )
}

export default Update

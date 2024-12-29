import {useState,useEffect} from 'react'
import {showP,delP,serP} from '../api/api'
import {Link} from 'react-router-dom'
const Productlist = () => {
    const [product,setProduct] = useState([])
    
    useEffect(()=>{
        show()
    },[])

    const show = async() =>{
        try{
            const res =  await showP()
            setProduct(res.data)
            console.log(product)
        }catch(error){
            console.log(error)
        }
    }

    const handeldel = async(id) =>{
        console.log(id)
        try{
            const res = await delP(id)
            if(res){
                alert("Delte the Product")
                show()

            }
        }catch(error){
            console.log(error)
        }
    }

const search =async(event)=>{
    let key = event.target.value;
    console.log(key)
    if(key){
        try{
            const res = await serP(key)
            if(res){
                setProduct(res.data)
            }
            console.log(res)
        }catch(error){
            console.log(error)
        }
    }else{
        show()
    }
   
}    
   
  return (
    <div className='main'>
        <input type="text" className="inbox"  placeholder="search" onChange={search}/>
        <h1>ProductList</h1>
        <table>
            <td> 
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Company</th>
                <th>Action</th>
                <tbody>
                    {
                       Array.isArray(product) &&  product.length>0?
                        (
                        product.map((d,i)=>{
                            const {name,price,category,company,_id} = d;
                            return(
                                <tr>
                                    <td>{name}</td>
                                    <td>{price}</td>
                                    <td>{category}</td>
                                    <td>{company}</td>
                                    <td>
                                        <Link to={`/update/${_id}`}><button>Edit</button></Link>
                                        <button onClick={()=>handeldel(_id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    ):(
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                 No Products Available
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </td>
        </table>
    </div>
  )
}

export default Productlist

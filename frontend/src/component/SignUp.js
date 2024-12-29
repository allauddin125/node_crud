import {useState,useEffect} from 'react'
import {postP} from '../api/api'
import {useNavigate} from 'react-router-dom'
const SignUp = () => {

    const [sign,setSign] = useState({
        name:'',
        email:'',
        password:''
    })
    
    const navigate = useNavigate();

    useEffect(()=>{
        const auth =localStorage.getItem('user')
        if(auth){
            navigate("/")
        }
    },[])

    const adduser = async () =>{
        try{
            const res = await postP(sign);
            console.log(res.data.auth)
            localStorage.setItem("user",JSON.stringify(res.data.result));
            localStorage.setItem("token",JSON.stringify(res.data.auth));
            
            if(res.status === 200){
                setSign({name:'',email:'',password:''})
                navigate("/")
            }

        }catch(error){
            console.log(error)
        }
    }

    const collectData = () =>{
        // console.log(sign)
        adduser();
    }
  return (
    
    <div className="main">
     
        <h1>Register</h1>
        <input  className="inbox" type="text" placeholder="Enter Name" value={sign.name} onChange={(e)=>setSign({...sign, name: e.target.value})} />
        <input className="inbox"  type="email" placeholder="Enter Email" value={sign.email} onChange={(e)=>setSign({...sign, email: e.target.value})}/>
        <input className="inbox"  type="password" placeholder="password" value={sign.password} onChange={(e)=>setSign({...sign, password: e.target.value})}/>
        <button onClick={collectData}>SignUp</button>
      
    </div>
  )
}

export default SignUp

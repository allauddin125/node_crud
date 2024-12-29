import {useState,useEffect} from 'react'
import {logP} from '../api/api'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const [log,setLog] = useState({
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
const handlelogin = async() =>{
    try{
        const res = await logP(log)
        console.log(res.data)
        if(res.data.auth){
            localStorage.setItem("user",JSON.stringify(res.data.user));
            localStorage.setItem("token",JSON.stringify(res.data.auth));
            navigate("/");
        }else{
            alert("Invalid Login details")
        }
    }catch(error){
        console.log(error)
    }

}
  return (
    <div className="main">
        <h1>Login Page</h1>
        <input className="inbox"  type="email" placeholder="Enter Email" value={log.email} onChange={(e)=>setLog({...log, email: e.target.value})}/>
        <input className="inbox"  type="password" placeholder="password" value={log.password} onChange={(e)=>setLog({...log, password: e.target.value})}/>
        <button onClick={handlelogin}>Login</button>
    </div>

  )
}

export default Login

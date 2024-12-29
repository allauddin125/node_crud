import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Nav = () => {

  const auth = localStorage.getItem('user');

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  }


  return (
    <div className="nav">
      {
        auth ?
        <ul className="nav-ul">
          <li><h2>{JSON.parse(auth).name}</h2></li>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          <li><Link to="/update">Update Product</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link onClick={logout} to="/signup" >Logout</Link></li> 
        </ul>
        :
        <ul className="nav-ul">
             <li><Link to="/signup">SignUp</Link></li>
             <li><Link to="/login">LogIn</Link></li>
        </ul>
      }
    </div>
  )
}

export default Nav;

import axios from 'axios'

const api = axios.create({
    baseURL : "http://localhost:5000"
})

//signup 
export const postP = (value) =>{
    return api.post("/signup",value)
}

//login
export const logP = (value) =>{
    return api.post("/login",value)
}

//add-product
export const addP = (value) =>{
    return api.post("/add-product",value,{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`//check the jwt token recive
        }
    })
}

//show the product
export const showP = ()=>{
    return api.get("/product",{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`//check the jwt token recive
        }
    });
}

//delete the product
export const delP = (id) =>{
    return api.delete(`/product/${id}`,{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`//check the jwt token recive
        }
    })
}

//get data by id
export const preP = (id) =>{
    return api.get(`/product/${id}`,{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`//check the jwt token recive
        }
    })
} 


//update product
export const upP = (id,value)=>{
    return api.put(`/product/${id}`,value,{
         headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`//check the jwt token recive
        }
    })
}

//serach product
export const serP = (id)=>{
    return api.get(`/search/${id}`,{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`//check the jwt token recive
        }
    }) 
}
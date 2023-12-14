import React, {useState, useEffect} from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'


function GetCustomer(){

    const navigate = useNavigate();  
    const { state } = useLocation();

    const[order,setOrder] = useState([]);
    const[cus,setCus] = useState([]);

    
    //fetch records
    function getOrder(){
        axios.get(`http://localhost:8070/sales/${state.orderNo}`).then((res)=>{
        setOrder(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getOrder();
    }, [])


    function getCus(){
        axios.get(`http://localhost:8070/customer/${order.customerID}`).then((res)=>{
        setCus(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getCus();
    }, [])

  

   

    return (
        <div class="home-section">


        {cus.map((post) => (
        <div class="details" key={post._id}>
        <h3><b>Driver Details</b></h3>
                    <p>{post.customerID}</p>
                    <p>{post.customerName}</p>
                    <p>{post.email}</p>
                    <p>{post.contactNo}</p>
                    <p>{post.address}</p>
        </div>
        ))}
        </div>

       
    )
} 

 export default GetCustomer;

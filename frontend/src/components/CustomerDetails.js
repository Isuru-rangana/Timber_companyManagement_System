import React, {useState, useEffect} from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'


function CustomerDetails(){
    
    const { state } = useLocation();
    const navigate = useNavigate();  
    const[cusId,setCusId] = useState([]);
    const[cus,setCus] = useState([]);

    
    //fetch records
    async function getCusID(){
        axios.get(`http://localhost:8070/sales/order/${state.orderNo}`).then((res)=>{
        setCusId(res.data);
        console.log(res.data);
        
        }).catch((err)=>{
            alert("There is no any customer for this order number");
        })
    }

    useEffect(()=>{
        getCusID();
    }, [])


    useEffect(()=>{
    function getCus(){
        axios.get(`http://localhost:8070/customer/order/${cusId.CustomerID}`).then((res)=>{
        setCus(res.data);
        })
    }

    
        getCus();
    },[cusId])



  

   

    return (
        <div class="home-section">
            <div class="top">
                
            
            </div>

        <div class="details">
            <div id="cus">
                <h3><b>Customer details</b></h3>

                    <p style={{ whiteSpace: 'pre' }}>Name                          :<span>{cus.CustomerName}</span></p>
                    <p style={{ whiteSpace: 'pre' }}>Address                      :<span>{cus.Address}</span></p>
                    <p style={{ whiteSpace: 'pre' }}>Contact Number      :<span>{cus.ContactNo}</span></p>
                    <p style={{ whiteSpace: 'pre' }}>Email                           : <span>{cus.Email}</span></p>
                    <br/>

                <Link to="/getDelivery" className="backBtn">
                    Back
                </Link>

            </div>
   


            </div>
        </div>
      
    )
} 

 export default CustomerDetails;

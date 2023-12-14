import React, {useState, useEffect} from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'


function DriverDetails(){

    const navigate = useNavigate();  
    const { state } = useLocation();

    const[drivers,setDrivers] = useState([]);

    
    //fetch records
    function getVehicles(){
        axios.get(`http://localhost:8070/employee/${state.driverID}`).then((res)=>{
        setDrivers(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getVehicles();
    }, [])

  

   

    return (
        <div class="home-section">


        {drivers.map((post) => (
        <div class="details" key={post._id}>
        <h3><b>Driver Details</b></h3>
           
                    <p>{post.employeeNo}</p>
                    <p>{post.employeeName}</p>
                    <p>{post.employeeAddress}</p>
                    <p>{post.employeeContactNo}</p>
                    <p>{post.drivingLicenseNo}</p>
        </div>
        ))}
        </div>

       
    )
} 

 export default DriverDetails;

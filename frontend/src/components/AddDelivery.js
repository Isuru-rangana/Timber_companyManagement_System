import React, { useState } from "react";
import axios from "axios";
import "./details.css"
import "./header.css"
import {useNavigate, Link} from 'react-router-dom';


function AddDelivery(){

    const navigate = useNavigate();  

    const [date, setDate] = useState("");
    const [orderNo, setOrderNo] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");
    const [status, setStatus] = useState("");


    function sendData(e){
        e.preventDefault();

        const newDelivery = {
            date,
            orderNo,
            vehicleNo,
            status,
        }


        axios.post("http://localhost:8070/delivery/add", newDelivery).then(()=>{
            alert("Delivery successfully added");
            navigate("/getDelivery")

        }).catch((err)=>{
            alert(err);
        })

    }
   

    return (
        
            <div class="home-section">
                <h2 className="form_head">Enter Delivery Details</h2>
                <form class="formContent" onSubmit={sendData}>
                <div class="mb-3">
                    <label class="form-label">Date</label><br/>
                    <input type="date" className="vehicleInput" required
                    onChange={(e)=>{
                        setDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label  class="form-label">Order Number</label><br/>
                    <input type="Number" className="vehicleInput" required maxLength="6"
                   
                    onChange={(e)=>{
                        setOrderNo(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label class="form-label">Vehicle Number</label><br/>
                    <input type="text" className="vehicleInput" required maxLength="7"
                    pattern="^[A-Z]{2}[0-9]{4}$|^[A-Z]{3}[0-9]{4}$|^[0-9]{6}$|^[0-9]{7}$" title="Enter a valid vehicle number (eg: AB1234, ABC1234, 123456, 1234567)"
                    onChange={(e)=>{
                        setVehicleNo(e.target.value);
                    }} />
                </div>              

                <div class="mb-3">
                    <label  class="form-label">Status</label><br/>

                    <select className="vehicleInput" onChange={(e)=>{
                        setStatus(e.target.value);
                    }}>
                        <option value="Delivered" selected>Delivered</option>
                        <option value="In Delivery">In Delivery</option>
                    </select>

    
                </div>


                <Link to="/getDelivery" className="backBtn">
                     Back
                </Link>

                <button type="submit" className="updateBtn">Submit</button>
                </form>
            </div>
       
    )
} 

 export default AddDelivery;

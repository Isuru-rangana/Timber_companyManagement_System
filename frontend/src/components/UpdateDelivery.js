import React, { useState } from "react";
import axios from "axios";
import "./details.css"
import "./header.css"
import {useNavigate,useLocation,Link} from 'react-router-dom';


function UpdateDelivery (){

    const { state } = useLocation();
    const navigate = useNavigate();  

    const [date, setDate] = useState(`${state.date}`);
    const [orderNo, setOrderNo] = useState(`${state.orderNo}`);
    const [vehicleNo, setVehicleNo] = useState(`${state.vehicleNo}`);
    const [status, setStatus] = useState(`${state.status}`);

    function sendData(e){
        e.preventDefault();

        const newDelivery = {
            date,
            orderNo,
            vehicleNo,
            status,
        }


        axios.put(`http://localhost:8070/delivery/update/${state.id}`, newDelivery ).then(()=>{
            alert("Delivery details updated");
            navigate("/getDelivery")

        }).catch((err)=>{
            alert(err);
        })

    }
   

    return (
        
            <div class="home-section">
                <h2 className="form_head">Update Delivery Details</h2>
                <form class="formContent" onSubmit={sendData}>
                <div class="mb-3">
                    <label class="form-label">Delivery Date</label><br/>
                    <input type="date" className="vehicleInput" value={date}
                    onChange={(e)=>{
                        setDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label  class="form-label">Order Number</label><br/>
                    <input type="Number" className="vehicleInput" value={orderNo} required maxLength="6"
                    onChange={(e)=>{
                        setOrderNo(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label class="form-label">Vehicle Number</label><br/>
                    <input type="text" className="vehicleInput" value={vehicleNo} required maxLength="7"
                    pattern="^[A-Z]{2}[0-9]{4}$|^[A-Z]{3}[0-9]{4}$|^[0-9]{6}$|^[0-9]{7}$" title="Enter a valid vehicle number (eg: AB1234, ABC1234, 123456, 1234567)"
                    onChange={(e)=>{
                        setVehicleNo(e.target.value);
                    }} />
                </div>
             

                <div class="mb-3">
                    <label  class="form-label">Status</label><br/>

                    <select value={status} className="vehicleInput" onChange={(e)=>{
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

 export default UpdateDelivery;

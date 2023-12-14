import React, { useState } from "react";
import axios from "axios";
import "./details.css"
import "./header.css"
import {useNavigate,Link} from 'react-router-dom';


function AddLogsTransport (){

    const navigate = useNavigate();  

    const [date, setDate] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");
    const [purchaseOrderNo, setPurchaseOrderNo] = useState("");
    const [noOfKms, setNoOfKms] = useState("");
    const [fuelConsumption, setFuelConsumption] = useState("");
    const [timberVolume, setTimberVolume] = useState("");

    function sendData(e){
        e.preventDefault();

        const newTransport = {
            date,
            vehicleNo,
            purchaseOrderNo,
            noOfKms,
            fuelConsumption,
            timberVolume,
        }


        axios.post("http://localhost:8070/transportation/add", newTransport ).then(()=>{
            alert("transportation added");
            navigate("/getTransportation")

        }).catch((err)=>{
            alert(err);
        })

    }
   

    return (
        
            <div class="home-section">
                <h2 className="form_head">Enter Transportation Details</h2>
                <form class="formContent" onSubmit={sendData}>
                <div class="mb-3">
                    <label class="form-label">Date</label><br/>
                    <input type="date" className="vehicleInput" required
                    onChange={(e)=>{
                        setDate(e.target.value);
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
                    <label  class="form-label">Purchase Order Number</label><br/>
                    <input type="text" className="vehicleInput" required maxLength="6"
                    pattern="[P]{1}[0-9]{5}" title="Enter a valid Purchase Order Number (eg: P12345)"
                    onChange={(e)=>{
                        setPurchaseOrderNo(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label  class="form-label">Number of Kilometers</label><br/>
                    <input type="text" className="vehicleInput" required min="0"
                    pattern="[0-9]+([.][0-9]+)?" title="Enter a number (eg: 6, 4.5)" 
                    onChange={(e)=>{
                        setNoOfKms(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label class="form-label">Fuel Consumption (Liters)</label><br/>
                    <input type="text" className="vehicleInput" required min="0"
                    pattern="[0-9]+([.][0-9]+)?" title="Enter a number (eg: 6, 4.5)"
                    onChange={(e)=>{
                        setFuelConsumption(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                    <label class="form-label">Timber Volume (Cubic Meters)</label><br/>
                    <input type="text" className="vehicleInput" required min="0"
                    pattern="[0-9]+([.][0-9]+)?" title="Enter a number (eg: 6, 4.5)"
                    onChange={(e)=>{
                        setTimberVolume(e.target.value);
                    }}/>
                </div>


                <Link to="/getTransportation" className="backBtn">
                     Back
                </Link>

                <button type="submit" className="updateBtn">Submit</button>
                </form>
            </div>
       
    )
} 

 export default AddLogsTransport;

import React, { useState } from "react";
import axios from "axios";
import "./details.css"
import "./header.css"
import {useNavigate,useLocation,Link} from 'react-router-dom';


function UpdateLogsTransport (){

    const { state } = useLocation();
    const navigate = useNavigate();  

    const [date, setDate] = useState(`${state.date}`);
    const [vehicleNo, setVehicleNo] = useState(`${state.vehicleNo}`);
    const [purchaseOrderNo, setPurchaseOrderNo] = useState(`${state.purchaseOrderNo}`);
    const [noOfKms, setNoOfKms] = useState(`${state.noOfKms}`);
    const [fuelConsumption, setFuelConsumption] = useState(`${state.fuelConsumption}`);
    const [timberVolume, setTimberVolume] = useState(`${state.timberVolume}`);

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


        axios.put(`http://localhost:8070/transportation/update/${state.id}`, newTransport ).then(()=>{
            alert("transportation updated");
            navigate("/getTransportation")

        }).catch((err)=>{
            alert(err);
        })

    }
   

    return (
        
            <div class="home-section">
                <h2 className="form_head">Update Transportation Details</h2>
                <form class="formContent" onSubmit={sendData}>
                <div class="mb-3">
                    <label class="form-label">Date</label><br/>
                    <input type="date" className="vehicleInput" value={date} 
                    onChange={(e)=>{
                        setDate(e.target.value);
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
                    <label  class="form-label">Purchase Order Number</label><br/>
                    <input type="text" className="vehicleInput" value={purchaseOrderNo} required maxLength="6"
                    pattern="[P]{1}[0-9]{5}" title="Enter a valid Purchase Order Number (eg: P12345)"
                    onChange={(e)=>{
                        setPurchaseOrderNo(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label  class="form-label">Number of Kilometers</label><br/>
                    <input type="text" className="vehicleInput" value={noOfKms} required
                    pattern="[0-9]+([.][0-9]+)?" title="Enter a number (eg: 6, 4.5)"
                    onChange={(e)=>{
                        setNoOfKms(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label class="form-label">Fuel Consumption</label><br/>
                    <input type="text" className="vehicleInput" value={fuelConsumption} required
                    pattern="[0-9]+([.][0-9]+)?" title="Enter a number (eg: 6, 4.5)"
                    onChange={(e)=>{
                        setFuelConsumption(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                    <label class="form-label">Timber Volume</label><br/>
                    <input type="text" className="vehicleInput" value={timberVolume} required 
                    pattern="[0-9]+([.][0-9]+)?"  title="Enter a number (eg: 6, 4.5)"
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

 export default UpdateLogsTransport;

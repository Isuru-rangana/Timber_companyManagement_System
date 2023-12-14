import React, {useState, useEffect} from "react";
import {Link, useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";

import "./details.css";



function UpdateVehicle(){

    const { state } = useLocation();
    const navigate = useNavigate(); 

   
        const [vehicleNo, setVehicleNo] = useState(`${state.vehicleNo}`);
        const [vehicleType, setVehicleType] = useState(`${state.vehicleType}`);
        const [fuelConsumptionRate, setFuelConsumptionRate] = useState(`${state.fuelConsumptionRate}`);
        const [driverID, setDriverID] = useState(`${state.driverID}`);
        const [drivingLicenseNo, setDrivingLicenseNo] = useState(`${state.drivingLicenseNo}`);


        function updateData(e){
            e.preventDefault();

            const newVehicle = {
                vehicleNo,
                vehicleType,
                fuelConsumptionRate,
                driverID,
                drivingLicenseNo
            }

            axios.put(`http://localhost:8070/vehicle/update/${state.id}`, newVehicle).then(()=>{
                alert("Vehicle updated");
                navigate("/getVehicles");
            }).catch((err)=>{
                alert(err);
            })

        }




        return (
            <div className="home-section">
            <h2 className="form_head">Update Vehicle Details</h2>
            <form className="formContent" onSubmit={updateData}>
                <div className="mb-3">
                <label className="form-label">Vehicle Number</label><br/>
                <input type="text" className="vehicleInput" required value={vehicleNo}
                    pattern="^[A-Z]{2}[0-9]{4}$|^[A-Z]{3}[0-9]{4}$|^[0-9]{6}$|^[0-9]{7}$" title="Enter a valid vehicle number (eg: AB1234, ABC1234, 123456, 1234567)"
                    onChange={(e) => {
                    setVehicleNo(e.target.value);
                    }} />
                </div>


                <div className="mb-3">
                <label className="form-label">Vehicle Type</label><br/>

                <select required className="vehicleInput" value={vehicleType} onChange={(e)=>{
                    setVehicleType(e.target.value);
                }}>
                    <option value="Normal Lorry - Full Body" >Normal Lorry - Full Body</option>
                    <option value="Normal Lorry - Deck Type" >Normal Lorry - Deck Type</option>
                    <option value="Normal Lorry - Half Body" >Normal Lorry - Half Body</option>
                    <option value="Crane Lorry - Deck Type" >Crane Lorry - Deck Type</option>
                    <option value="Crane Lorry - Half Type" >Crane Lorry - Half Type</option>
                </select>

                </div>


                <div className="mb-3">
                <label className="form-label">Fuel Consumption Rate (Permissible lowest value)</label><br/>
                <input type="text" className="vehicleInput" required min="0" value={fuelConsumptionRate}
                pattern="[0-9]+([.][0-9]+)?" title="Enter a number (eg: 6, 4.5)"
                    onChange={(e) => {
                    setFuelConsumptionRate(e.target.value);
                    }} />
                </div>


                <div className="mb-3">
                <label className="form-label">Driver ID</label><br/>
                <input type="text" className="vehicleInput" required  value={driverID}
                pattern="[0-9]{4}" title="Enter a valid Driver ID (eg: 1234)"
                    onChange={(e) => {
                    setDriverID(e.target.value);
                    }} />
                </div>


                <div className="mb-3">
                <label className="form-label">Driving Licence No</label><br/>
                <input type="text" className="vehicleInput" required minLength="8" maxLength="8" value={drivingLicenseNo}
                    pattern="[A-Z]{1}[0-9]{7}" title="Enter a valid driving licence number (eg: A1234567)"
                    onChange={(e) => {
                    setDrivingLicenseNo(e.target.value);
                    }} />
                </div>

                
                <Link to="/getVehicles" className="backBtn">
                    Back
                </Link>
             
                <button type="submit" className="updateBtn">Submit</button>
                </form>
            </div>
            
    )

}

export default UpdateVehicle;
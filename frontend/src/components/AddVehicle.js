import React, { useState } from "react";
import axios from "axios";
import "./details.css"
import "./header.css"
import { useNavigate, Link } from 'react-router-dom';

function AddVehicle() {
  const navigate = useNavigate();  

  const [vehicleNo, setVehicleNo] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [fuelConsumptionRate, setFuelConsumptionRate] = useState("");
  const [driverID, setDriverID] = useState("");
  const [drivingLicenseNo, setDrivingLicenseNo] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newVehicle = {
      vehicleNo,
      vehicleType,
      fuelConsumptionRate,
      driverID,
      drivingLicenseNo,
    }

    axios.post("http://localhost:8070/vehicle/add", newVehicle)
      .then(() => {
        alert("vehicle added");
        navigate("/getVehicles");
      })
      .catch((err) => {
        alert(err);
      })
  }

  return (
    <div className="home-section">
      <h2 className="form_head">Enter Vehicle Details</h2>
      <form className="formContent" onSubmit={sendData}>
        <div className="mb-3">
          <label className="form-label">Vehicle Number</label><br/>
          <input type="text" className="vehicleInput" required
            pattern="^[A-Z]{2}[0-9]{4}$|^[A-Z]{3}[0-9]{4}$|^[0-9]{6}$|^[0-9]{7}$" title="Enter a valid vehicle number (eg: AB1234, ABC1234, 123456, 1234567)"
            onChange={(e) => {
              setVehicleNo(e.target.value);
            }} />
        </div>

        <div className="mb-3">
          <label className="form-label">Vehicle Type</label><br/>

          <select className="vehicleInput" onChange={(e)=>{
              setVehicleType(e.target.value);
          }}>
              <option value="Normal Lorry - Full Body" selected>Normal Lorry - Full Body</option>
              <option value="Normal Lorry - Deck Type" >Normal Lorry - Deck Type</option>
              <option value="Normal Lorry - Half Body" >Normal Lorry - Half Body</option>
              <option value="Crane Lorry - Deck Type" >Crane Lorry - Deck Type</option>
              <option value="Crane Lorry - Half Type" >Crane Lorry - Half Type</option>
           </select>

        </div>

        <div className="mb-3">
          <label className="form-label">Fuel Consumption Rate (Permissible lowest value)</label><br/>
          <input type="text" className="vehicleInput" required min="0"
           pattern="[0-9]+([.][0-9]+)?" title="Enter a number (eg: 6, 4.5)"
            onChange={(e) => {
              setFuelConsumptionRate(e.target.value);
            }} />
        </div>

        <div className="mb-3">
          <label className="form-label">Driver ID</label><br/>
          <input type="text" className="vehicleInput" required pattern="[0-9]{4}" title="Enter a valid Driver ID (eg: 1234)"
            onChange={(e) => {
              setDriverID(e.target.value);
            }} />
        </div>

        <div className="mb-3">
          <label className="form-label">Driving Licence No</label><br/>
          <input type="text" className="vehicleInput" required maxLength="8"
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

 export default AddVehicle;

import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";



function AddNewSales(){

    const navigate = useNavigate(); 

    const [Date, setDate] = useState("");
    const [OrderNo, setOrderNo] = useState("");
    const [CustomerID, setCustomerID] = useState("");
    const [Saleprice, setSaleprice] = useState("");
    const [Status, setStatus] = useState("");

   

    function sendData(e){
        e.preventDefault();

        const newSales = {
            Date,
            OrderNo,
            CustomerID,
            Saleprice,
            Status
           
        }

        axios.post('http://localhost:8070/sales/add', newSales).then(()=>{
            alert("Sales added");
            navigate("/getSales");

        }).catch((err)=>{
            alert(err);
        });

    }
   

    return ( 
        <div className="home-section">
            <h1 className="form_head">Add Sales Details</h1>
            <form class="formContent" onSubmit={sendData}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Date</label><br/>
                <input type="date" class="formInput" required
                onChange={(e)=>{
                    setDate(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Order No</label><br/>
                <input type="number" class="formInput" required
                onChange={(e)=>{
                    setOrderNo(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Customer ID</label><br/>
                <input type="number" class="formInput" required
                onChange={(e)=>{
                    setCustomerID(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Sale Value(Rs)</label><br/>
                <input type="text" class="formInput" required pattern="[0-9]+([.][0-9]+)?" title="Enter a valid price"
                onChange={(e)=>{
                    setSaleprice(e.target.value);
                }}/>
            </div>

            
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Status</label><br/>
                
                <select className="formInput" onChange={(e)=>{
                        setStatus(e.target.value);
                    }}>
                        <option value="Pending" selected>Pending</option>
                        <option value="Done">Done</option>
                    </select>
            </div>

            
            <Link to="/getSales" className="backBtn">Back</Link>
            <button type="submit" className="updateBtn">Submit</button>
            </form>
        </div>
    )
} 

 export default AddNewSales;
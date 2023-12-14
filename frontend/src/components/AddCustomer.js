import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./details.css";
import "./header.css";



function AddCustomer(){

    const [CustomerName, setCustomerName] = useState("");
    const [Email, setEmail] = useState("");
    const [ContactNo, setContactNo] = useState("");
    const [Address, setAddress] = useState("");
   

    function sendData(e){
        e.preventDefault();

        const newCustomer = {
            CustomerName,
            Email,
            ContactNo,
            Address,
           
        }

        axios.post('http://localhost:8070/customer/add', newCustomer).then(()=>{
            alert("Customer added");
        }).catch((err)=>{
            alert(err);
        });

    }
   

    return ( 
        <div className="home-section">
            <h2 className="form_head">Add Customer Details</h2>
            <form className="formContent" onSubmit={sendData}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Customer Name</label><br/>
                <input type="text" className="formInput"  maxLength="50"
                onChange={(e)=>{
                    setCustomerName(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Email</label><br/>
                <input type="email" className="formInput"  required
                
                onChange={(e)=>{
                    setEmail(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">ContactNo</label><br/>
                <input type="phone" className="formInput" required maxLength="10"
                pattern="[0]{1}[0-9]{9}" title="Enter a valid phone number (eg: 0771234567)"
                onChange={(e)=>{
                    setContactNo(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Address</label><br/>
                <input type="text" className="formInput" required
                onChange={(e)=>{
                    setAddress(e.target.value);
                }}/>
            </div>


            
            <Link to="/getCustomer" className="backBtn">Back</Link>
            <button type="submit" className="updateBtn">Submit</button>
            </form>
        </div>
    )
} 

 export default AddCustomer;
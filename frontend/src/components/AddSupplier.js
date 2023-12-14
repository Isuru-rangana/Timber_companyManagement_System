import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./details.css";
import "./header.css";



function addSupplier(){

    const [ supplierId, setSupplierId] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [phone,  setphone] = useState("");
    const [email, setemail] = useState("");
    
   

    function sendData(e){
        e.preventDefault();

        const newSupplier = {
            supplierId,
            supplierName,
            phone,
            email,
            
           
        }

        axios.post('http://localhost:8070/supplier/add', newSupplier).then(()=>{
            alert("Supplier added");
        }).catch((err)=>{
            alert(err);
        });

    }
   

    return ( 
        <div className="home-section">
            <h2 className="form_head">Add Supplier Details</h2>
            <form className="formContent" onSubmit={sendData}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Supplier ID</label><br/>
                <input type="text" className="formInput"  maxLength="5"
                onChange={(e)=>{
                    setSupplierId(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">supplier Name</label><br/>
                <input type="text" className="formInput"  required
                
                onChange={(e)=>{
                    setSupplierName(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Phone</label><br/>
                <input type="number" className="formInput" required maxLength="10"
               
                onChange={(e)=>{
                    setphone(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Email</label><br/>
                <input type="email" className="formInput" required
                onChange={(e)=>{
                    setemail(e.target.value);
                }}/>
            </div>
            

            
            <Link to="/getSupplier" className="backBtn">Back</Link>
            <button type="submit" className="updateBtn">Submit</button>
            </form>
        </div>
    )
} 

 export default addSupplier;
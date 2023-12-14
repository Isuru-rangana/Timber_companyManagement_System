import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./details.css";
import "./header.css";



function addSinvoice(){

    const [ date, setdate] = useState("");
    const [invoiceNo, setinvoiceNo] = useState("");
    const [supplier,  setsupplier] = useState("");
    const [amount, setamount] = useState("");
    const [purchaseOrderNo, setPurchaseOrderNo] = useState("");
   

    function sendData(e){
        e.preventDefault();

        const newSinvoice = {
            date,
            invoiceNo,
            supplier,
            amount,
            purchaseOrderNo
           
        }

        axios.post('http://localhost:8070/sinvoice/add', newSinvoice).then(()=>{
            alert("Invoice added");
        }).catch((err)=>{
            alert(err);
        });

    }
   

    return ( 
        <div className="home-section">
            <h2 className="form_head">Add Invoice Details</h2>
            <form className="formContent" onSubmit={sendData}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Date</label><br/>
                <input type="date" className="formInput"  maxLength="5"
                onChange={(e)=>{
                    setdate(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Invoice No</label><br/>
                <input type="text" className="formInput"  required
                
                onChange={(e)=>{
                    setinvoiceNo(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Supplier</label><br/>
                <input type="text" className="formInput" required maxLength="20"
               
                onChange={(e)=>{
                    setsupplier(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Amount</label><br/>
                <input type="text" className="formInput" required
                onChange={(e)=>{
                    setamount(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Purchase Order Number</label><br/>
                <input type="text" className="formInput" required
                onChange={(e)=>{
                    setPurchaseOrderNo(e.target.value);
                }}/>
            </div>

            
            <Link to="/getSinvoice" className="backBtn">Back</Link>
            <button type="submit" className="updateBtn">Submit</button>
            </form>
        </div>
    )
} 

 export default addSinvoice;
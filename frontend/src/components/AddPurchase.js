import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./details.css";
import "./header.css";



function addPurchase(){
    const [date, setDate] = useState("");
    const [ purchaseOrderNo, setPurchaseOrderNo] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [itemName,  setitemName] = useState("");
    const [quantity, setquantity] = useState("");
    const [amount, setAmount] = useState("");
   
    function sendData(e){
        e.preventDefault();

        const newPurchase = {
            date,
            purchaseOrderNo,
            supplierName,
            itemName,
            quantity,
            amount
           
        }
        axios.post('http://localhost:8070/purchaseorder/add', newPurchase).then(()=>{
            alert("Purchase added");
        }).catch((err)=>{
            alert(err);
        });
    }
   
    return ( 
        <div className="home-section">
            <h2 className="form_head">Add Purchase Details</h2>
            <form className="formContent" onSubmit={sendData}>

            <div class="mb-3">
                    <label class="form-label">Date</label><br/>
                    <input type="date" className="vehicleInput" required
                    onChange={(e)=>{
                        setDate(e.target.value);
                    }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">purchase Order No</label><br/>
                <input type="text" className="formInput"  maxLength="5"
                onChange={(e)=>{
                    setPurchaseOrderNo(e.target.value);
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
                <label for="exampleInputEmail1" class="form-label">item Name</label><br/>
                <input type="text" className="formInput" required maxLength="20"
               
                onChange={(e)=>{
                    setitemName(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Quantity</label><br/>
                <input type="number" className="formInput" required
                onChange={(e)=>{
                    setquantity(e.target.value);
                }}/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Amount</label><br/>
                <input type="number" className="formInput" required
                onChange={(e)=>{
                    setAmount(e.target.value);
                }}/>
            </div>
            
            <Link to="/getPurchase" className="backBtn">Back</Link>
            <button type="submit" className="updateBtn">Submit</button>
            </form>
        </div>
    )
} 
export default addPurchase;
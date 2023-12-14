import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./details.css";
import "./header.css";



function AddOrderItems(){
    const { state } = useLocation();

    const [OrderNo, setOrderNo] = useState("");
    const [ItemNo, setItem] = useState("");
    const [Quantity, setQuantity] = useState("");

    

    function sendData(e){
        e.preventDefault();

        const newOrderItems = {
            OrderNo,
            ItemNo,
            Quantity,
            
        }

        axios.post('http://localhost:8070/orderItem/add', newOrderItems).then(()=>{
            alert("Items added");
        }).catch((err)=>{
            alert("wxw");
        });

    }
   

    return ( 
        <div className="home-section">
            <h2 className="form_head">Add Order Details</h2>
            <form className="formContent" onSubmit={sendData}>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Order Number</label><br/>
                <input type="text" className="formInput"  required value={OrderNo}
                
                onChange={(e)=>{
                    setOrderNo(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Item</label><br/>
                <input type="text" className="formInput"  required
                
                onChange={(e)=>{
                    setItem(e.target.value);
                }} />
            </div>


            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Quantity</label><br/>
                <input type="text" className="formInput" required
                onChange={(e)=>{
                    setQuantity(e.target.value);
                }}/>
            </div>


            
            <Link to="/getSales" className="backBtn">Back</Link>
            <button type="submit" className="updateBtn">Submit</button>
            </form>
        </div>
    )
} 

 export default AddOrderItems;
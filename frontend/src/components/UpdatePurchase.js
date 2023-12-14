import React, {useState, useEffect} from "react";
import {Link, useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";

import "./details.css";



function UpdatePurchase(){

    const { state } = useLocation();

    const [date, setDate] = useState(`${state.date}`);
    const [purchaseOrderNo, setPurchaseOrderNo] = useState(`${state.purchaseOrderNo}`);
    const [supplierName, setSupplierName] = useState(`${state.supplierName}`);
    const [itemName,  setitemName] = useState(`${state.itemName}`);
    const [quantity, setquantity] = useState(`${state.quantity}`);
    const [amount, setAmount] = useState(`${state.amount}`);
       
        function updateData(e){
            e.preventDefault();

            const newPurchase = {
                date,
                purchaseOrderNo,
                supplierName,
                itemName,
                quantity,
                amount
                
            }
            axios.put(`http://localhost:8070/purchaseorder/update/${state.id}`, newPurchase).then(()=>{
                alert("Purchase updated");
            }).catch((err)=>{
                alert(err);
            })
        }
        return (
            <div className="home-section">
                <h1 className="form_head">Update Purchase Details</h1>
                <form class="formContent" onSubmit={updateData}>

                <div class="mb-3">
                    <label class="form-label">Date</label><br/>
                    <input type="date" className="vehicleInput"  value={date} required
                    onChange={(e)=>{
                        setDate(e.target.value);
                    }} />
                 </div>

                <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">purchase Order No</label><br/>
                    <input type="text" class="formInput" value={purchaseOrderNo} required
                    onChange={(e)=>{
                        setPurchaseOrderNo(e.target.value);
                    }} />
                </div>
                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">supplier Name</label><br/>
                    <input type="text" class="formInput" value={supplierName} required
                    onChange={(e)=>{
                        setSupplierName(e.target.value);
                    }} />
                </div>
                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">quantity</label><br/>
                    <input type="text" class="formInput" value={quantity} required maxLength="10"
                  
                    onChange={(e)=>{
                        setquantity(e.target.value);
                    }}/>
                </div>
                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">item Name</label><br/>
                    <input type="text" class="formInput" value={itemName} required maxLength="10"
                 
                    onChange={(e)=>{
                        setitemName(e.target.value);
                    }}/>
                </div>
                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Amount</label><br/>
                    <input type="text" class="formInput"  value={amount} required
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
export default UpdatePurchase;
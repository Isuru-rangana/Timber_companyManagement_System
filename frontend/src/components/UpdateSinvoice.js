import React, {useState, useEffect} from "react";
import {Link, useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";

import "./details.css";



function UpdateSinvoice(){

    const { state } = useLocation();

   
    const [date, setDate] = useState(`${state.date}`);
    const [invoiceNo, setinvoiceNo] = useState(`${state.invoiceNo}`);
    const [supplier,  setsupplier] = useState(`${state.supplier}`);
    const [amount, setamount] = useState(`${state.amount}`);
    const [purchaseOrderNo, setPurchaseOrderNo] = useState(`${state.purchaseOrderNo}`);
       

        function updateData(e){
            e.preventDefault();

            const newSinvoice = {
                date,
                invoiceNo,
                supplier,
                amount,
                purchaseOrderNo
                
            }

            axios.put(`http://localhost:8070/sinvoice/update/${state.id}`, newSinvoice).then(()=>{
                alert("Invoice updated");
            }).catch((err)=>{
                alert(err);
            })

        }




        return (
            <div className="home-section">
                <h1 className="form_head">Update Invoice Details</h1>
                <form class="formContent" onSubmit={updateData}>
                <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Date</label><br/>
                    <input type="date" class="formInput" value={date} required
                    onChange={(e)=>{
                        setDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Invoice No</label><br/>
                    <input type="text" class="formInput" value={invoiceNo} required
                    onChange={(e)=>{
                        setinvoiceNo(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Supplier</label><br/>
                    <input type="text" class="formInput" value={supplier} required maxLength="10"
                  
                    onChange={(e)=>{
                        setsupplier(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Amount</label><br/>
                    <input type="text" class="formInput" value={amount} required maxLength="10"
                 
                    onChange={(e)=>{
                        setamount(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Purchase Order Number</label><br/>
                    <input type="text" class="formInput"  value={purchaseOrderNo} required
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

export default UpdateSinvoice;
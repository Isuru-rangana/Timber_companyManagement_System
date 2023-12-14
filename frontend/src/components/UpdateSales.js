import React, {useState, useEffect} from "react";
import {Link, useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";

import "./details.css";



function UpdateSales(){

    const { state } = useLocation();

   
        const [Date, setDate] = useState(`${state.Date}`);
        const [OrderNo, setOrderNo] = useState(`${state.OrderNo}`);
        const [CustomerID, setCustomerID] = useState(`${state.CustomerID}`);
        const [Saleprice, setSalePrice] = useState(`${state.Saleprice}`);
        const [Status, setStatus] = useState(`${state.Status}`);
       

        function updateData(e){
            e.preventDefault();

            const newSales = {
                Date,
                OrderNo,
                CustomerID,
                Saleprice,
                Status
                
            }

            axios.put(`http://localhost:8070/sales/update/${state.id}`, newSales).then(()=>{
                alert("Sales updated");
            }).catch((err)=>{
                alert(err);
            })

        }




        return (
            <div className="home-section">
                <h1 className="form_head">Update Sales Details</h1>
                <form class="formContent" onSubmit={updateData}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Date</label><br/>
                    <input type="date" class="formInput"  value={Date} required
                    onChange={(e)=>{
                        setDate(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Order No</label><br/>
                    <input type="number" class="formInput" value={OrderNo} required
                    onChange={(e)=>{
                        setOrderNo(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Customer ID</label><br/>
                    <input type="text" class="formInput"  value={CustomerID} required
                    onChange={(e)=>{
                        setCustomerID(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Sale Price(Rs)</label><br/>
                    <input type="text" class="formInput"  value={Saleprice} required pattern="[0-9]+([.][0-9]+)?" title="Enter a valid price"
                    onChange={(e)=>{
                        setSalePrice(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Status</label><br/>
                
                <select className="formInput" value={Status} onChange={(e)=>{
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

export default UpdateSales;
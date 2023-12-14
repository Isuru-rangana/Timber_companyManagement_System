import React, {useState, useEffect} from "react";
import {Link, useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";

import "./details.css";



function UpdateOrderItems(){

    const { state } = useLocation();

   
        const [OrderNo, setOrderNo] = useState(`${state.OrderNo}`);
        const [Item, setItem] = useState(`${state.Item}`);
        const [Quantity, setQuantity] = useState(`${state.Quantity}`);
       

        function updateData(e){
            e.preventDefault();

            const newOrderItems = {
                OrderNo,
                Item,
                Quantity,

                
            }

            axios.put(`http://localhost:8070/orderitems/update/${state.id}`, newOrderItems).then(()=>{
                alert("items updated");
            }).catch((err)=>{
                alert(err);
            })

        }




        return (
            <div className="home-section">
                <h1 className="form_head">Update Order Details</h1>
                <form class="formContent" onSubmit={updateData}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Order No</label><br/>
                    <input type="text" class="formInput" value={OrderNo} required
                    onChange={(e)=>{
                        setOrderNo(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Item</label><br/>
                    <input type="email" class="formInput" value={Item} required
                    onChange={(e)=>{
                        setItem(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Quantity</label><br/>
                    <input type="text" class="formInput"  value={Quantity} required
                    onChange={(e)=>{
                        setQuantity(e.target.value);
                    }}/>
                </div>
                

                

                <Link to="/getOrderItems" className="backBtn">Back</Link>
                <button type="submit" className="updateBtn">Submit</button>
                </form>
            </div>
        )

}

export default UpdateOrderItems;
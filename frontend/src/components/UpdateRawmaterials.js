import React, {useState, useEffect} from "react";
import {Link, useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";

import "./details.css";

function UpdateRawmaterials(){

    const { state } = useLocation();

   
        const [Materials_Id, setMaterials_ID] = useState(`${state.Materials_ID}`);
        const [Materials_Name, setMaterials_Name] = useState(`${state.Materials_Name}`);
        const [Quantity, setQuantity] = useState(`${state.Quantity}`);
        const [Price, setPrice] = useState(`${state.Price}`);
       

        function updateData(e){
            e.preventDefault();

            const newRawmaterials = {
                Materials_Id,
                Materials_Name,
                Quantity,
                Price,
               
            }

            axios.put(`http://localhost:8070/rawMaterials/update/${state.id}`, newRawmaterials).then(()=>{
                alert("Materials updated");
            }).catch((err)=>{
                alert(err);
            })

        }

        return (
            <div class="home-section">
            <h2 class="form_head">Enter Raw Materials Details</h2>
            <form class="formContent" onSubmit={updateData}>
            <div class="mb-3">
                <label class="form-label">Materials ID</label><br/>
                <input type="text" className="formInput" value={Materials_Id} required
                pattern="M[0-9]{4}" title="Enter a valid Material ID (eg: M1234)"
                onChange={(e)=>{
                    setMaterials_ID(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label >Material Name</label><br/>
                <input type="text" className="formInput" value={Materials_Name} required
                onChange={(e)=>{
                    setMaterials_Name(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label  class="form-label">Quantity</label><br/>
                <input type="number" className="formInput" value={Quantity} required
                onChange={(e)=>{
                    setQuantity(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label  class="form-label">Price</label><br/>
                <input type="text" className="formInput" value={Price} required
                pattern="[0-9]+([.][0-9]+)?" title="Enter a valid Price"
                onChange={(e)=>{
                    setPrice(e.target.value);
                }} />
            </div>

            <Link to="/getRawMaterials" className="backBtn">
                Back
            </Link>
            <button type="submit" class="updateBtn">Submit</button>
            </form>
        </div>
        )

}

export default UpdateRawmaterials;
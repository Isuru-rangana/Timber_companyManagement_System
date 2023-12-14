import React, { useState } from "react";
import axios from "axios";
import "./details.css"
import "./header.css"
import {useNavigate,Link} from 'react-router-dom';


function AddRawmaterials(){

    const navigate = useNavigate();  

    const [Materials_Id, setMaterials_Id] = useState("");
    const [Materials_Name, setMaterials_Name] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [Price, setPrice] = useState("");

    function sendData(e){
        e.preventDefault();

        const newRawmaterials = {
            Materials_Id,
            Materials_Name,
            Quantity,
            Price,
        }


        axios.post("http://localhost:8070/rawMaterials/add", newRawmaterials).then(()=>{
            alert("Raw Material added");
            navigate("/getRawMaterials")

        }).catch((err)=>{
            alert(err);
        })

    }
   

    return (
        
            <div class="home-section">
                <h2 class="form_head">Enter Raw Materials Details</h2>
                <form class="formContent" onSubmit={sendData}>
                <div class="mb-3">
                    <label class="form-label">Materials ID</label><br/>
                    <input type="text" className="formInput" required
                    pattern="M[0-9]{4}" title="Enter a valid Material ID (eg: M1234)"
                    onChange={(e)=>{
                        setMaterials_Id(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label >Material Name</label><br/>
                    <input type="text" className="formInput" required
                    onChange={(e)=>{
                        setMaterials_Name(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label  class="form-label">Quantity</label><br/>
                    <input type="number" className="formInput" required
                    onChange={(e)=>{
                        setQuantity(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label  class="form-label">Price</label><br/>
                    <input type="text" className="formInput" required
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

 export default AddRawmaterials;

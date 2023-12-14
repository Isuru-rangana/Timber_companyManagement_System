import React, { useState } from "react";
import axios from "axios";
import "./details.css"
import "./header.css"
import {useNavigate} from 'react-router-dom';


function AddFurniture(){

    const navigate = useNavigate();  

    const [Item_Code, setFurniture_No] = useState("");
    const [Item_Name, setFurniture_Name] = useState("");
    const [Quantity, setQuantity] = useState("");

    function sendData(e){
        e.preventDefault();

        const newFurniture = {
            Item_Code,
            Item_Name,
            Quantity,
        }


        axios.post("http://localhost:8070/furniture/add", newFurniture).then(()=>{
            alert("Furniture added");
            navigate("/getFurniture")

        }).catch((err)=>{
            alert(err);
        })

    }
   

    return (
        
            <div class="home-section">
                <h2 className="form_head">Enter Furniture Details</h2>
                <form className="formContent" onSubmit={sendData}>
                <div class="mb-3">
                    <label class="form-label">Furniture_No</label><br/>
                    <input type="text" className="formInput" pattern="F{1}[0-9]{4}" title="Enter a valid furniture number (eg: F1234)"
                    onChange={(e)=>{
                        setFurniture_No(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label >Furniture_Name</label><br/>
                    <input type="text" className="formInput"
                    onChange={(e)=>{
                        setFurniture_Name(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label  class="form-label">Quantity</label><br/>
                    <input type="Number" className="formInput"
                    onChange={(e)=>{
                        setQuantity(e.target.value);
                    }} />
                </div>        
                
                <button type="submit" class="updateBtn">Submit</button>
                </form>
            </div>
       
    )
} 

 export default AddFurniture;

import React, {useState, useEffect} from "react";
import {Link, useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";

import "./details.css";

function UpdateFurniture(){

    const { state } = useLocation();

   
        const [Item_Code, setFurniture_No] = useState(`${state.Item_Code}`);
        const [Item_Name, setFurniture_Name] = useState(`${state.Item_Name}`);
        const [Quantity, setQuantity] = useState(`${state.Quantity}`);
     


        function updateData(e){
            e.preventDefault();

            const newFurniture = {
                Item_Code,
                Item_Name,
                Quantity,
             
            }

            axios.put(`http://localhost:8070/furniture/update/${state.id}`, newFurniture).then(()=>{
                alert("Logs updated");
            }).catch((err)=>{
                alert(err);
            })

        }




        return (
            <div className="home-section">
                <h1 className="form_head">Update Furniture</h1>
                <form className="formContent" onSubmit={updateData}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Furniture_No</label><br/>
                    <input type="text" class="formInput" id="exampleInputEmail1" aria-describedby="emailHelp" value={Item_Code}
                    onChange={(e)=>{
                        setFurniture_No(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Furniture_Name</label><br/>
                    <input type="text" class="formInput" id="exampleInputPassword1" value={Item_Name}
                    onChange={(e)=>{
                        setFurniture_Name(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Quantity</label><br/>
                    <input type="text" class="formInput" id="exampleInputPassword1" value={Quantity}
                    onChange={(e)=>{
                        setQuantity(e.target.value);
                    }}/>
                </div>

                <Link to="/getFurniture" className="backBtn">Back</Link>
                <button type="submit" class="updateBtn" >Update</button>
                </form>
            </div>
        )

}

export default UpdateFurniture;
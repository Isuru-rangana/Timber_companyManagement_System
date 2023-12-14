import React, {useState, useEffect} from "react";
import {Link, useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";

import "./details.css";



function UpdateSupplier(){

    const { state } = useLocation();

   
    const [supplierId, setSupplierId] = useState(`${state.supplierId}`);
    const [supplierName, setSupplierName] = useState(`${state.supplierName}`);
    const [phone,  setphone] = useState(`${state.phone}`);
    const [email, setemail] = useState(`${state.email}`);
    
       

        function updateData(e){
            e.preventDefault();

            const newSupplier = {
                supplierId,
                supplierName,
                phone,
                email,
                
                
            }

            axios.put(`http://localhost:8070/supplier/update/${state.id}`, newSupplier).then(()=>{
                alert("Supplier updated");
            }).catch((err)=>{
                alert(err);
            })

        }




        return (
            <div className="home-section">
                <h1 className="form_head">Update Supplier Details</h1>
                <form class="formContent" onSubmit={updateData}>
                <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Supplier ID</label><br/>
                    <input type="text" class="formInput" value={supplierId} required
                    onChange={(e)=>{
                        setSupplierId(e.target.value);
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
                <label for="exampleInputPassword1" class="form-label">Phone</label><br/>
                    <input type="text" class="formInput" value={phone} required maxLength="10"
                  
                    onChange={(e)=>{
                        setphone(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Email</label><br/>
                    <input type="text" class="formInput" value={email} required maxLength="10"
                 
                    onChange={(e)=>{
                        setemail(e.target.value);
                    }}/>
                </div>

                
                
             
                

                <Link to="/getSupplier" className="backBtn">Back</Link>
                <button type="submit" className="updateBtn">Submit</button>
                </form>
            </div>
        )

}

export default UpdateSupplier;
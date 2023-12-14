import React, { useState } from "react";
import axios from "axios";
import "./details.css"
import "./header.css"
import {useNavigate, Link} from 'react-router-dom';


function AddTimberlogs(){

    const navigate = useNavigate();  

    const [Log_No, setLog_No] = useState("");
    const [Timber_Type, setTimber_Type] = useState("");
    const [Length, setLength] = useState("");
    const [Girth, setGirth] = useState("");
    const [Volume, setVolume] = useState("");
    const [Date, setDate] = useState("");

    function sendData(e){
        e.preventDefault();

        const newTimberlogs = {
            Log_No,
            Timber_Type,
            Length,
            Girth,
            Volume,
            Date
        }


        axios.post("http://localhost:8070/timberlog/add", newTimberlogs).then(()=>{
            alert("Timber Logs added");
            navigate("/getTimberlogs")

        }).catch((err)=>{
            alert(err);
        })

    }
   

    return (
        
            <div class="home-section">
                <h2 class="form_head">Enter Timber Logs Details</h2>
                <form class="formContent" onSubmit={sendData}>
                <div class="mb-3">
                    <label class="form-label">Log Number</label><br/>
                    <input type="text" className="formInput" required
                    pattern="TL[0-9]{4}" title="Enter a valid Log Number (eg: TL1234)"
                    onChange={(e)=>{
                        setLog_No(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label >Timber Type</label><br/>
                    <input type="text" className="formInput" required
                    onChange={(e)=>{
                        setTimber_Type(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label  class="form-label">Length (m)</label><br/>
                    <input type="text" className="formInput" required
                    pattern="[0-9]+([.][0-9]+)?" title="Enter a valid Length (eg: 6, 4.5)"
                    onChange={(e)=>{
                        setLength(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label  class="form-label">Girth (m)</label><br/>
                    <input type="text" className="formInput" required
                    pattern="[0-9]+([.][0-9]+)?" title="Enter a valid Girth (eg: 6, 4.5)"
                    onChange={(e)=>{
                        setGirth(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label class="form-label">Volume (m^3)</label><br/>
                    <input type="text" className="formInput" required
                    pattern="[0-9]+([.][0-9]+)?" title="Enter a valid Volume (eg: 6, 4.5)"
                    onChange={(e)=>{
                        setVolume(e.target.value);
                    }}/>
                </div>

                
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Date</label><br/>
                    <input type="date" className="formInput" required maxLength="10"
                
                    onChange={(e)=>{
                        setDate(e.target.value);
                    }}/>
                </div>

                <Link to="/getTimberlogs" className="backBtn">
                      Back
                </Link>

                <button type="submit" class="updateBtn">Submit</button>
                </form>
            </div>
       
    )
} 

 export default AddTimberlogs;

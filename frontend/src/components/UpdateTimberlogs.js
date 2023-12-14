import React, {useState, useEffect} from "react";
import {Link, useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";

import "./details.css";

function UpdateTimberlogs(){

    const { state } = useLocation();
    
   
        const [Log_No, setLog_No] = useState(`${state.Log_No}`);
        const [Timber_Type, setTimber_Type] = useState(`${state.Timber_Type}`);
        const [Length, setLength] = useState(`${state.Length}`);
        const [Girth, setGirth] = useState(`${state.Girth}`);
        const [Volume, setVolume] = useState(`${state.Volume}`);
        const [Date, setDate] = useState(`${state.Date}`);


        function updateData(e){
            e.preventDefault();

            const newTimberlogs = {
                Log_No,
                Timber_Type,
                Length,
                Girth,
                Volume,
                Date
            }

            axios.put(`http://localhost:8070/timberlog/update/${state.id}`, newTimberlogs).then(()=>{
                alert("Logs updated");
            }).catch((err)=>{
                alert(err);
            })

        }




        return (
            <div class="home-section">
                <h2 class="form_head">Enter Timber Logs Details</h2>
                <form class="formContent" onSubmit={updateData}>
                <div class="mb-3">
                    <label class="form-label">Log Number</label><br/>
                    <input type="text" className="formInput" value={Log_No} required
                    pattern="TL[0-9]{4}" title="Enter a valid Log Number (eg: TL1234)"
                    onChange={(e)=>{
                        setLog_No(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label >Timber Type</label><br/>
                    <input type="text" className="formInput" value={Timber_Type}
                    onChange={(e)=>{
                        setTimber_Type(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label  class="form-label">Length (m)</label><br/>
                    <input type="text" className="formInput" value={Length} required
                    pattern="[0-9]+([.][0-9]+)?" title="Enter a valid Length (eg: 6, 4.5)"
                    onChange={(e)=>{
                        setLength(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label  class="form-label">Girth (m)</label><br/>
                    <input type="text" className="formInput" value={Girth} required
                    pattern="[0-9]+([.][0-9]+)?" title="Enter a valid Length (eg: 6, 4.5)"
                    onChange={(e)=>{
                        setGirth(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label class="form-label">Volume (m^3)</label><br/>
                    <input type="text" className="formInput" value={Volume} required
                    pattern="[0-9]+([.][0-9]+)?" title="Enter a valid Length (eg: 6, 4.5)"
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

export default UpdateTimberlogs;
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, Link} from 'react-router-dom';

import "./details.css"
import "./header.css"


function AddLeaveRequest(){

    const [employeeNo, setEmployeeNo] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [from, setfrom] = useState("");
    const [ to, setto] = useState("");
    const [reason, setreason] = useState("");
    

    function sendData(e){
        e.preventDefault();

        const newLeaveRequest= {
            employeeNo,
            employeeName,
            from,
            to,
            reason
        }
        

        axios.post("http://localhost:8070/leaveRequest/add", newLeaveRequest).then(()=>{
            alert("Leave Request added");
        }).catch((err)=>{
            alert(err);
        })

    }
   

    return ( 
        <div className="home-section">
            <h2 className="form_head">Add Customer Details</h2>
            <form className="formContent" onSubmit={sendData}>
            <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Employee Number</label><br/>
                <input type="text" className="formInput"  maxLength="5"  required
               onChange={(e)=>{
                setEmployeeNo(e.target.value);
            }} />
            </div>

            <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Employee Name</label><br/>
                <input type="text" className="formInput"  required
                
                onChange={(e)=>{
                    setEmployeeName(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">From</label><br/>
                <input type="date" className="formInput" required maxLength="10"
               
                onChange={(e)=>{
                    setfrom(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">To</label><br/>
                <input type="date" className="formInput" required
                 onChange={(e)=>{
                    setto(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Reason</label><br/>
                <input type="text" className="formInput" required
                onChange={(e)=>{
                    setreason(e.target.value);
                }}/>
            </div>
            
            <Link to="/getLeaveRequest" className="backBtn">Back</Link>
            <button type="submit" className="updateBtn">Submit</button>
            </form>
        </div>
    )
} 

 export default AddLeaveRequest;

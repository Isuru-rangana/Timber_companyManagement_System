import React, {useState, useEffect} from "react";
import {Link, useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";


import "./details.css"
import "./header.css"


function UpdateLeaveRequest(){
    const { state } = useLocation();

    const [employeeNo, setEmployeeNo] = useState(`${state.employeeNo}`);
    const [employeeName, setEmployeeName] = useState(`${state.employeeName}`);
    const [from, setfrom] = useState(`${state.from}`);
    const [ to, setto] = useState(`${state.to}`);
    const [reason, setreason] = useState(`${state.reason}`);
    

    function updateData(e){
        e.preventDefault();

        const newLeaveRequest= {
            employeeNo,
            employeeName,
            from,
            to,
            reason
        }
        

        axios.put(`http://localhost:8070/leaveRequest/update/${state.id}`, newLeaveRequest).then(()=>{
            alert("Leave Request updated");
        }).catch((err)=>{
            alert(err);
        })

    }
   

    return ( 
        <div className="home-section">
            <h2 className="form_head">Update Leave Request</h2>
            <form className="formContent" onSubmit={updateData}>
            <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Employee Number</label><br/>
                <input type="text" className="formInput"  maxLength="5" value={employeeNo}  required
               onChange={(e)=>{
                setEmployeeNo(e.target.value);
            }} />
            </div>

            <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Employee Name</label><br/>
                <input type="text" className="formInput" value={employeeName}  required
                
                onChange={(e)=>{
                    setEmployeeName(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">From</label><br/>
                <input type="date" className="formInput"value={from}  required maxLength="10"
               
                onChange={(e)=>{
                    setfrom(e.target.value);
                }}/>
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">To</label><br/>
                <input type="date" className="formInput"value={ to}  required
                 onChange={(e)=>{
                    setto(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Reason</label><br/>
                <input type="text" className="formInput" value={reason} required
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

 export default UpdateLeaveRequest;
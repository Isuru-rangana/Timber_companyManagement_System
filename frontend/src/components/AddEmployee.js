import React, {useState, useEffect} from "react";
import axios from "axios";

import { useNavigate, Link } from 'react-router-dom';


import "./details.css"
import "./header.css"


function AddEmployee(){

    const [employeeNo, setEmployeeNo] = useState("");
    const [NIC, setNIC] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeAddress, setEmployeeAddress] = useState("");
    const [employeeContactNo, setEmployeeContactNo] = useState("");
    const [employeeJobTitle, setEmployeeJobTitle] = useState("");
    

    function sendData(e){
        e.preventDefault();

        const newEmployee = {
            employeeNo,
            NIC,
            employeeName,
            employeeAddress,
            employeeContactNo,
            employeeJobTitle
        }
        

        axios.post("http://localhost:8070/employee/add", newEmployee).then(()=>{
            alert("Employee added");
        }).catch((err)=>{
            alert(err);
        })

    }
   

    return ( 
        <div className="home-section">

           <h1 className="form_head">Add Employee Details</h1>
            <form class="formContent"  onSubmit={sendData}>
            <div class="mb-3">
                <label class="form-label">Employee Number</label><br/>
                <input type="text" class="formInput" required minLength="5" maxLength="5"
                pattern="[E]{1}[0-9]{4}"
                title="Enter valid Employee ID (eg: E1234)"
                onChange={(e)=>{
                    setEmployeeNo(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label class="form-label">Employee NIC</label><br/>
                <input type="text" class="formInput" required maxLength="12"
                pattern="[0-9]{12}"
                title="Enter valid NIC (eg: 123456789123)"
                onChange={(e)=>{
                    setNIC(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label class="form-label">Employee Name</label><br/>
                <input type="text" class="formInput" required

                onChange={(e)=>{
                    setEmployeeName(e.target.value);
                }} />
            </div>

          

            <div class="mb-3">
                <label  class="form-label">Employee Contact No</label><br/>
                <input type="phone" class="formInput" required maxLength="10"
                pattern="0[0-9]{9}"
                title="Enter a Valid Phone Number (eg: 0771234567)"

                
                onChange={(e)=>{
                    setEmployeeContactNo(e.target.value);
                }}/>
            </div>

            <div class="mb-3">

                <label for="exampleInputPassword1" class="form-label">Address</label><br/>
                <input type="text" className="formInput" required
                 onChange={(e)=>{
                    setEmployeeAddress(e.target.value);
                }} />
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Employee job Title</label><br/>
                <input type="text" className="formInput" required

                onChange={(e)=>{
                    setEmployeeJobTitle(e.target.value);
                }}/>
            </div>


            <Link to="/getEmployees" className="backBtn">
                Back
            </Link> 
            <button type="submit" class="updateBtn">Submit</button>

            </form>
        </div>
    )
} 

 export default AddEmployee;

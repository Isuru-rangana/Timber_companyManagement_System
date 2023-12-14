import React, {useState, useEffect} from "react";
import {Link, useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";


import "./details.css"
import "./header.css"


function UpdateEmployee(){

    const { state } = useLocation();

   
        const [employeeNo, setEmployeeeNo] = useState(`${state.employeeNo}`);
        const [NIC, setNIC] = useState(`${state.NIC}`);
        const [employeeName, setEmployeeName] = useState(`${state.employeeName}`);
        const [employeeAddress, setEmployeeAddress] = useState(`${state.employeeAddress}`);
        const [employeeContactNo, setemployeeContactNo] = useState(`${state.employeeContactNo}`);
        const [employeeJobTitle, setEmployeeJobTitle] = useState(`${state.employeeJobTitle}`);



        function updateData(e){
            e.preventDefault();

            const newEmployee = {
                employeeNo,
                NIC,
                employeeName,
                employeeAddress,
                employeeContactNo,
                employeeJobTitle,
            
            }

            axios.put(`http://localhost:8070/employee/update/${state.id}`, newEmployee).then(()=>{
                alert("Employee updated");
            }).catch((err)=>{
                alert(err);
            })

        }




        return (
            <div className="home-section">
                <h1 className="form_head">Update Employee Details</h1>
                <form class="formContent" onSubmit={updateData}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Employee Number</label><br/>
                    <input type="text" class="formInput"  value={employeeNo} required minLength="5" maxLength="5"
                    pattern="[E]{1}[0-9]{4}"
                    title="Enter valid Employee ID (eg: E1234)"
                    onChange={(e)=>{
                        setEmployeeeNo(e.target.value);
                    }} />
                

            <div class="mb-3">
                <label class="form-label">Employee NIC</label><br/>
                <input type="text" class="formInput" required maxLength="12" value={NIC}
                pattern="[0-9]{12}"
                title="Enter valid NIC (eg: 123456789123)"
                onChange={(e)=>{
                    setNIC(e.target.value);
                }} />
            </div>

                <div class="mb-3">

                    <label for="exampleInputPassword1" class="form-label">Employee Name</label><br/>
                    <input type="text" class="formInput" value={employeeName} required
                    onChange={(e)=>{
                        setEmployeeName(e.target.value);
                    }} />
                </div>
    

                <div class="mb-3">
                    <label  class="form-label">Employee Contact No</label><br/>
                    <input type="phone" class="formInput" value={employeeContactNo} required maxLength="10"
                     pattern="0[0-9]{9}"
                     title="Enter a Valid Phone Number (eg: 0771234567)"

                 
                    onChange={(e)=>{
                        setemployeeContactNo(e.target.value);
                    }}/>
                </div>
    
              


                    <label for="exampleInputPassword1" class="form-label">Address</label><br/>
                    <input type="text" className="formInput" value={employeeAddress} required
                     onChange={(e)=>{
                        setEmployeeAddress(e.target.value);
                    }} />
                </div>
    
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Employee job Title</label><br/>
                    <input type="text" className="formInput" value={employeeJobTitle} required
                    onChange={(e)=>{
                        setEmployeeJobTitle(e.target.value);
                    }}/>
                </div>
                
                <Link to="/getEmployees" className="backBtn">Back</Link>
                <button type="submit" className="updateBtn">Submit</button>

                </form>
            </div>
        )

        

}

export default UpdateEmployee;
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import "./details.css"
import "./header.css"
import search_icon from '../images/search_icon.png'


function EmployeeDetails(){

    const navigate = useNavigate();  

    const[employee,setEmployee] = useState([]);

    const[search,setSearch] = useState("");

    
    //fetch records
    function getEmployees(){
        axios.get("http://localhost:8070/employee").then((res)=>{
        setEmployee(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getEmployees();
    }, [])



    //delete record by id
    function deleteEmployee(id){
            axios.delete(`http://localhost:8070/Employee/delete/${id}`)
            .then((result)=>{
                getEmployees();
            })
             .catch(()=>{
                 alert("Error ane");
            });
        }
  

   

    return (
        <div class="home-section">
        <div class="top">
        <Link id="add_btn"  to="/AddEmployee" className="btn btn-dark">New Employee</Link>

       

        <Link id="report_btn"  to="/report" class="btn btn-dark">Report</Link>


        
        <form id="search" 
         onChange={(e) => setSearch(e.target.value)}>

            <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
         
        </form>
        
         
        </div>

        <div class="details">
        <h3><b>Employee details</b></h3>
            <table class="table">
                <thead>
                <tr>
                    <th>Employee No</th>
                    <th>Employee NIC</th>
                    <th>Employee Name</th>
                    <th>Employee Address</th>
                    <th>Employee Contact No</th>
                    <th>Employee Job Title </th>
                  
                </tr>
                </thead>

                <tbody>
                {employee.filter((post)=> {
                    return search === ''
                    ? post
                    : post.employeeNo.toLowerCase().includes(search) || post.employeeNo.toUpperCase().includes(search)|| post.employeeNo.includes(search) ||
                    post.employeeName.toLowerCase().includes(search)|| post.employeeName.toUpperCase().includes(search) || post.employeeName.includes(search)||
                    post.employeeAddress.toLowerCase().includes(search) ||post.employeeAddress.toUpperCase().includes(search)||post.employeeAddress.includes(search)||
                    post.employeeContactNo.toString().includes(search) ||
                    post.employeeJobTitle.toUpperCase().includes(search) ||post.employeeJobTitle.toLowerCase().includes(search)||post.employeeJobTitle.includes(search) ;
                 
                })
                
                                
                //I have to get driver details from employee table
                .map((post) => (
                <tr key={post._id}>
                    <td>{post.employeeNo}</td>
                    <td>{post.NIC}</td>
                    <td>{post.employeeName}</td>
                    <td>{post.employeeAddress}</td>
                    <td>{post.employeeContactNo}</td>
                    <td>{post.employeeJobTitle}</td>
                    

                    

                    <td><button onClick={()=>{
                        navigate("/updateEmployee",
                        {
                            state: {
                                id: `${post._id}`,
                                employeeNo: `${post.employeeNo}`,
                                NIC:`${post.NIC}`,
                                employeeName: `${post.employeeName}`,
                                employeeAddress: `${post.employeeAddress}`,
                                employeeContactNo: `${post.employeeContactNo}`,
                                employeeJobTitle: `${post.employeeJobTitle}`,
                            
                                
                            }
                        });
                    }}className="updateBtn"  style={{fontSize:"14px"}}>Update</button></td>

                    <td><button onClick={()=>{
                        const confirmBox = window.confirm(
                            "Do you really want to delete"
                        )
                        if(confirmBox === true){
                            deleteEmployee(post._id);
                        }
                    }} className="deleteBtn"  style={{fontSize:"14px"}}>Delete</button></td>

                </tr>            
                ))}

                </tbody>
            </table>
            </div>
        </div>
      
    )
} 

 export default EmployeeDetails;

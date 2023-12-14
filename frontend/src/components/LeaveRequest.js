import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import "./details.css"
import "./header.css"
import search_icon from '../images/search_icon.png'


function LeaveRequestDetails(){

    const navigate = useNavigate();  

    const[leaveRequest,setLeaveRequest] = useState([]);

    const[search,setSearch] = useState("");

    
    //fetch records
    function getLeaveRequest(){
        axios.get("http://localhost:8070/leaveRequest").then((res)=>{
        setLeaveRequest(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getLeaveRequest();
    }, [])



    //delete record by id
    function deleteLeaveRequest(id){
            axios.delete(`http://localhost:8070/leaveRequest/delete/${id}`)
            .then((result)=>{
                getLeaveRequest();
            })
             .catch(()=>{
                 alert("Error ane");
            });
        }
  

   

    return (
        <div class="home-section">
        <div class="top">
        <Link id="add_btn"  to="/AddLeaveRequest" className="btn btn-dark">New Leave Request</Link>
        <Link id="report_btn"  to="/LeaveReport" class="btn btn-dark">Report</Link>
      

        
        <form id="search" 
         onChange={(e) => setSearch(e.target.value)}>

            <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
         
        </form>
        
         
        </div>

        <div class="details">
        <h3><b>Leave Request</b></h3>
            <table class="table">
                <thead>
                <tr>
                    <th>Employee Number</th>
                    <th>Employee Name</th>
                    <th>from</th>
                    <th>To</th>
                    <th>Reason </th>
                   
                </tr>
                </thead>

                <tbody>
                {leaveRequest.filter((post)=> {
                    return search === ''
                    ? post
                    : post.employeeNo.toLowerCase().includes(search) || post.employeeNo.toUpperCase().includes(search) || post.employeeName.includes(search) 
    
                 
                })
                
                                
                //I have to get driver details from employee table
                .map((post) => (
                <tr key={post._id}>
                    <td>{post.employeeNo}</td>
                    <td>{post.employeeName}</td>
                    <td>{post.from.substring(0,10)}</td>
                    <td>{post.to.substring(0,10)}</td>
                    <td>{post.reason}</td>
                    
                    

                    <td><button onClick={()=>{
                        navigate("/updateLeave",
                        {
                            state: {
                                id: `${post._id}`,
                                employeeNo: `${post.employeeNo}`,
                                employeeName : `${post.employeeName}`,
                                from: `${post.from.substring(0,10)}`,
                                to: `${post.to.substring(0,10)}`,
                                reason: `${post.reason}`
                                
                                
                            }
                        });
                    }}className="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                    <td><button onClick={()=>{
                        const confirmBox = window.confirm(
                            "Do you really want to delete"
                        )
                        if(confirmBox === true){
                            deleteLeaveRequest(post._id);
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

 export default LeaveRequestDetails;
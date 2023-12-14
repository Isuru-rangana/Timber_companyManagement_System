import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'


function LogsTransportHistory(){

    const navigate = useNavigate();  

    const[transportations,setTransportations] = useState([]);

    const[search,setSearch] = useState("");

    
    //fetch records
    function getTransportations(){
        axios.get("http://localhost:8070/transportation").then((res)=>{
        setTransportations(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getTransportations();
    }, [])



    //delete record by id
    function deleteTransportation(id){
            axios.delete(`http://localhost:8070/transportation/delete/${id}`)
            .then((result)=>{
                getTransportations();
            })
             .catch(()=>{
                 alert("Error ane");
            });
        }
  

   

    return (
        <div class="home-section">
        <div class="top">
        <Link id="add_btn"  to="/addTransportation" className="btn btn-dark">New Transportation</Link>

        <Link id="report_btn"  to="/transportReport" class="btn btn-dark">Report</Link>


        
        <form id="search" 
         onChange={(e) => setSearch(e.target.value)}>

            <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
         
        </form>
        
         
        </div>

        <div class="details">
        <h3><b>Timber Logs Transport History</b></h3>
            <table class="table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Vehicle Number</th>
                    <th>Purchase Order Number</th>
                    <th>Number of Kilometers</th>
                    <th>Fuel Consumption (liters)</th>
                    <th>Transported Timber Volume</th>
                    
                </tr>
                </thead>

                <tbody>
                {transportations.filter((post)=> {
                    return search === ''
                    ? post
                    : post.vehicleNo.toLowerCase().includes(search) || post.vehicleNo.toUpperCase().includes(search) || post.vehicleNo.includes(search) ||
                    post.purchaseOrderNo.toLowerCase().includes(search) || post.purchaseOrderNo.toUpperCase().includes(search) || post.purchaseOrderNo.includes(search)||
                    post.date.toLowerCase().includes(search) || post.date.toUpperCase().includes(search) || post.date.includes(search)
                 
                })
                
                                
                
                .map((post) => (
                <tr key={post._id}>
                    <td>{post.date.substring(0, 10)}</td>
                    <td>{post.vehicleNo}</td>
                    <td>{post.purchaseOrderNo}</td>
                    <td>{post.noOfKms}</td>
                    <td>{post.fuelConsumption}</td>
                    <td>{post.timberVolume}</td>
                    

                    <td><button onClick={()=>{
                        navigate("/updateTransportation",
                        {
                            state: {
                                id: `${post._id}`,
                                date: `${post.date.substring(0, 10)}`,
                                vehicleNo: `${post.vehicleNo}`,
                                purchaseOrderNo: `${post.purchaseOrderNo}`,
                                noOfKms: `${post.noOfKms}`,
                                fuelConsumption: `${post.fuelConsumption}`,
                                timberVolume: `${post.timberVolume}`
                                
                            }
                        });
                    }}className="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                    <td><button onClick={()=>{
                        const confirmBox = window.confirm(
                            "Do you really want to delete"
                        )
                        if(confirmBox === true){
                            deleteTransportation(post._id);
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

 export default LogsTransportHistory;

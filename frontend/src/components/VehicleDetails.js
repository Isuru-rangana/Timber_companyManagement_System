import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'


function VehicleDetails(){

    const navigate = useNavigate();  

    const[vehicles,setVehicles] = useState([]);

    const[search,setSearch] = useState("");

    
    //fetch records
    function getVehicles(){
        axios.get("http://localhost:8070/vehicle").then((res)=>{
        setVehicles(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getVehicles();
    }, [])



    //delete record by id
    function deleteVehicle(id){
            axios.delete(`http://localhost:8070/Vehicle/delete/${id}`)
            .then((result)=>{
                getVehicles();
            })
             .catch(()=>{
                 alert("Error ane");
            });
        }
  

   

    return (
        <div class="home-section">
            <div class="top">
                <Link id="add_btn"  to="/addVehicle" className="btn btn-dark">New Vehicle</Link>


                
                <form id="search" 
                onChange={(e) => setSearch(e.target.value)}>

                    <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
                
                </form>
                
            
            </div>

        <div class="details">
        <h3><b>Vehicle details</b></h3>
            <table class="table">
                <thead>
                <tr>
                    <th>Vehicle Number</th>
                    <th>Vehicle Type</th>
                    <th>Fuel Consumption Rate<br/>(Permissible Lowest Value)</th>
                    <th>Driver ID</th>
                    <th>Driving License Number </th>
                </tr>
                </thead>

                <tbody>
                {vehicles.filter((post)=> {
                    return search === ''
                    ? post
                    : post.vehicleNo.toLowerCase().includes(search) || post.vehicleNo.toUpperCase().includes(search) || post.vehicleNo.includes(search) ||
                    post.vehicleType.toLowerCase().includes(search) || post.vehicleType.toUpperCase().includes(search) || post.vehicleType.includes(search)||
                    post.driverID.toLowerCase().includes(search) || post.driverID.toUpperCase().includes(search) || post.driverID.includes(search)/*||
                    post.driverNIC.toLowerCase().includes(search) || post.driverNIC.toUpperCase().includes(search) || post.driverNIC.includes(search)||
                    post.drivingLicenseNo.toLowerCase().includes(search) || post.drivingLicenseNo.toUpperCase().includes(search) || post.drivingLicenseNo.includes(search)||
                    post.driverContactNo.toLowerCase().includes(search) || post.driverContactNo.toUpperCase().includes(search) || post.driverContactNo.includes(search)||
                    post.route.toLowerCase().includes(search) || post.route.toUpperCase().includes(search) || post.route.includes(search)*/;
                 
                })
                
                                
                //I have to get driver details from employee table
                .map((post) => (
                <tr key={post._id}>
                    <td>{post.vehicleNo}</td>
                    <td>{post.vehicleType}</td>
                    <td>{post.fuelConsumptionRate}</td>
                    <td>{post.driverID}</td>

                    <td>{post.drivingLicenseNo}</td>
      
                    

                    <td><button onClick={()=>{
                        navigate("/updateVehicle",
                        {
                            state: {
                                id: `${post._id}`,
                                vehicleNo: `${post.vehicleNo}`,
                                vehicleType: `${post.vehicleType}`,
                                fuelConsumptionRate: `${post.fuelConsumptionRate}`,
                                driverID: `${post.driverID}`,
                                drivingLicenseNo: `${post.drivingLicenseNo}`,
                                
                            }
                        });
                    }}className="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                    <td><button onClick={()=>{
                        const confirmBox = window.confirm(
                            "Do you really want to delete"
                        )
                        if(confirmBox === true){
                            deleteVehicle(post._id);
                        }
                    }} className="deleteBtn" style={{fontSize:"14px"}}>Delete</button></td>

                </tr>            
                ))}

                </tbody>
            </table>
            </div>
        </div>
      
    )
} 

 export default VehicleDetails;

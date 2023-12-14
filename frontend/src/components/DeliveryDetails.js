import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'


function DeliveryDetails(){

    const navigate = useNavigate();  

    const[deliveries,setDeliveries] = useState([]);

    const[search,setSearch] = useState("");

    
    //fetch records
    function getDeliveries(){
        axios.get("http://localhost:8070/delivery").then((res)=>{
        setDeliveries(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getDeliveries();
    }, [])



    //delete record by id
    function deleteDelivery(id){
            axios.delete(`http://localhost:8070/delivery/delete/${id}`)
            .then((result)=>{
                getDeliveries();
            })
             .catch(()=>{
                 alert("Error ane");
            });
        }
  

   

    return (
        <div class="home-section">
            <div class="top">
                <Link id="add_btn"  to="/addDelivery" className="btn btn-dark">New Delivery</Link>


                
                <form id="search" 
                onChange={(e) => setSearch(e.target.value)}>

                    <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
                
                </form>
                
            
            </div>

        <div class="details">
        <h3><b>Delivery details</b></h3>
            <table class="table">
                <thead>
                <tr>
                    <th>Delivery Date</th>
                    <th>Order Number</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Status</th>
                </tr>
                </thead>

                <tbody>
                {deliveries.filter((post)=> {
                    return search === ''
                    ? post
                    : post.vehicleNo.toLowerCase().includes(search) || post.vehicleNo.toUpperCase().includes(search) || post.vehicleNo.includes(search) ||
                    post.date.includes(search)||
                    post.orderNo.includes(search);
                 
                })
                
                                
                //I have to get driver details from employee table
                .map((post) => (
                <tr key={post._id}>
                    <td>{post.date}</td>
                    <td>{post.orderNo}</td>
                    <td><button  id="viewbtn"
                    onClick={()=>{
                        navigate("/getCus",
                        {
                            state: {
                                orderNo: `${post.orderNo}`,
                                
                            }
                        });
                    }}>View</button></td>

                    <td>{post.vehicleNo}</td>
                    <td>{post.status}</td>
      
                    

                    <td><button onClick={()=>{
                        navigate("/updateDelivery",
                        {
                            state: {
                                id: `${post._id}`,
                                date: `${post.date}`,
                                orderNo: `${post.orderNo}`,
                                vehicleNo: `${post.vehicleNo}`,
                                status: `${post.status}`,
                                
                            }
                        });
                    }}className="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                    <td><button onClick={()=>{
                        const confirmBox = window.confirm(
                            "Do you really want to delete"
                        )
                        if(confirmBox === true){
                            deleteDelivery(post._id);
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

 export default DeliveryDetails;

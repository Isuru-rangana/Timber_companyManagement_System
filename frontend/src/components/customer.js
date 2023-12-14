import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'


function Customer(){
    const navigate = useNavigate();  

    const[Customer,setCustomer] = useState([]);

    const[search,setSearch] = useState("");

    
    //fetch records
    function getCustomer(){
        axios.get("http://localhost:8070/customer").then((res)=>{
        setCustomer(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getCustomer();
    }, [])



    //delete record by id
    function deleteCustomer(id){
            axios.delete(`http://localhost:8070/customer/delete/${id}`)
            .then((result)=>{
                getCustomer();
            })
             .catch(()=>{
                 alert("Error");
            });
        }
  

   

    return (
        <div class="home-section">
        <div class="top">
        <Link id="add_btn"  to="/addCustomer" className="btn btn-dark">New Customer</Link>




        
        <form id="search" 
         onChange={(e) => setSearch(e.target.value)}>

            <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
         
        </form>
        
         
        </div>

        <div class="details">
        <h3><b>Customer details</b></h3>
            <table class="table">
                <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Contact No</th>
                    <th>Address</th>
                    
                </tr>
                </thead>

                <tbody>
                {Customer.filter((post)=> {
                    return search === ''
                    ? post
                    : post.CustomerName.toLowerCase().includes(search) || post.CustomerName.toUpperCase().includes(search) || post.CustomerName.includes(search) ||
                    post.Email.toLowerCase().includes(search) || post.Email.toUpperCase().includes(search) || post.Email.includes(search)||
                    post.CustomerID.toString().includes(search)||
                    post.Address.toLowerCase().includes(search) || post.Address.toUpperCase().includes(search) || post.Address.includes(search);
                 
                })
                
                                
                //I have to get customer details from customer table
                .map((post) => (
                <tr key={post._id}>
                    <td>{post.CustomerID}</td>
                    <td>{post.CustomerName}</td>
                    <td>{post.Email}</td>
                    <td>{post.ContactNo}</td>
                    <td>{post.Address}</td>
                    

                    <td><button onClick={()=>{
                        navigate("/UpdateCustomer",
                        {
                            state: {
                                id: `${post._id}`,
                                CustomerName: `${post.CustomerName}`,
                                Email: `${post.Email}`,
                                ContactNo: `${post.ContactNo}`,
                                Address: `${post.Address}`,
                                CustomerNic: `${post.CustomerNic}`,
                            }
                        });
                    }}class="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                    <td><button onClick={()=>{
                        const confirmBox = window.confirm(
                            "Do you really want to delete"
                        )
                        if(confirmBox === true){
                            deleteCustomer(post._id);
                        }
                    }} class="deleteBtn"  style={{fontSize:"14px"}}>Delete</button></td>

                </tr>            
                ))}

                </tbody>
            </table>
            </div>
        </div>
      
    )
} 

 export default Customer;

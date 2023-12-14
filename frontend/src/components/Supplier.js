import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'



function Supplier(){
    const navigate = useNavigate();  

    const[Supplier,setSupplier] = useState([]);

    const[search,setSearch] = useState("");

    
    //fetch records
    function getSupplier(){
        axios.get("http://localhost:8070/supplier").then((res)=>{
        setSupplier(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getSupplier();
    }, [])



    //delete record by id
    function deleteSupplier(id){
            axios.delete(`http://localhost:8070/supplier/delete/${id}`)
            .then((result)=>{
                getSupplier();
            })
             .catch(()=>{
                 alert("Error");
            });
        }
  

   

    return (
        <div class="home-section">
        <div class="top">
        <Link id="add_btn"  to="/addSupplier" className="btn btn-dark">New Supplier</Link>




        
        <form id="search" 
         onChange={(e) => setSearch(e.target.value)}>

            <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
         
        </form>
        
         
        </div>

        <div class="details">
        <h3><b>Supplier details</b></h3>
            <table class="table">
                <thead>
                <tr>
                <th>Supplier ID</th>
                    <th>Supplier Name</th>
                    <th>Phone </th>
                    <th>Email</th>
                    
                    
                </tr>
                </thead>

                <tbody>
                {Supplier.filter((post)=> {
                    return search === ''
                    ? post
                    : post.supplierId.toLowerCase().includes(search) || post.supplierName.toUpperCase().includes(search) 
                   
                 
                })
                
                                
                //I have to get customer details from customer table
                .map((post) => (
                <tr key={post._id}>
                     <td>{post.supplierId}</td>
                    <td>{post.supplierName }</td>
                    <td>{post.phone }</td>
                    <td>{post.email} </td>

                    
                    

                    <td><button onClick={()=>{
                        navigate("/UpdateSupplier",
                        {
                            state: {
                                id: `${post._id}`,
                                supplierId: `${post.supplierId}`,
                                supplierName: `${post.supplierName}`,
                                phone: `${post.phone}`,
                                email: `${post.email}`,
                               
                            }
                        });
                    }}class="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                    <td><button onClick={()=>{
                        const confirmBox = window.confirm(
                            "Do you really want to delete"
                        )
                        if(confirmBox === true){
                            deleteSupplier(post._id);
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

 export default Supplier;
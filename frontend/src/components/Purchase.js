import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'


function Purchase(){
    const navigate = useNavigate();  
    const[Purchase,setPurchase] = useState([]);
    const[search,setSearch] = useState("");
    
    //fetch records
    function getPurchase(){
        axios.get("http://localhost:8070/purchaseorder").then((res)=>{
        setPurchase(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }
    useEffect(()=>{
        getPurchase();
    }, [])
    //delete record by id
    function deletePurchase(id){
            axios.delete(`http://localhost:8070/purchaseorder/delete/${id}`)
            .then((result)=>{
                getPurchase();
            })
             .catch(()=>{
                 alert("Error");
            });
        }
  
   
    return (
        <div class="home-section">
        <div class="top">
        <Link id="add_btn"  to="/addPurchase" className="btn btn-dark">New Purchase</Link>

        <Link id="report_btn"  to="/purchaseReport" class="btn btn-dark">Report</Link>



        <form id="search" 
         onChange={(e) => setSearch(e.target.value)}>
            <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
         
        </form>
        
         
        </div>
        <div class="details">
        <h3><b>Purchase details</b></h3>
            <table class="table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>purchase Order No</th>
                    <th>supplier Name</th>
                    <th>item Name </th>
                    <th>quantity</th>
                    <th>amount </th>
                    
                </tr>
                </thead>
                <tbody>
                {Purchase.filter((post)=> {
                    return search === ''
                    ? post
                    : post.purchaseOrderNo.toLowerCase().includes(search) || post.purchaseOrderNo.toUpperCase().includes(search) || post.supplierName.toLowerCase().includes(search)
                   
                 
                })
                
                                
                //I have to get customer details from customer table
                .map((post) => (
                <tr key={post._id}>
                     <td>{post.date.substring(0, 10)}</td>
                     <td>{post.purchaseOrderNo}</td>
                    <td>{post.supplierName }</td>
                    <td>{post.itemName }</td>
                    <td>{post.quantity} </td>
                    <td>{post.amount}</td>
                    
                    <td><button onClick={()=>{
                        navigate("/UpdatePurchase",
                        {
                            state: {
                                id: `${post._id}`,
                                date: `${post.date.substring(0, 10)}`,
                                purchaseOrderNo: `${post.purchaseOrderNo}`,
                                supplierName: `${post.supplierName}`,
                                itemName: `${post.itemName}`,
                                quantity: `${post.quantity}`,
                                amount: `${post.amount}`,
                            }
                        });
                    }}class="updateBtn" style={{fontSize:"14px"}}>Update</button></td>
                    <td><button onClick={()=>{
                        const confirmBox = window.confirm(
                            "Do you really want to delete"
                        )
                        if(confirmBox === true){
                            deletePurchase(post._id);
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

 export default Purchase;
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'


function Sales(){
    const navigate = useNavigate();  

    const[Sales,setSales] = useState([]);

    const[search,setSearch] = useState("");

    
    //fetch records
    function getSales(){
        axios.get("http://localhost:8070/sales").then((res)=>{
        setSales(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getSales();
    }, [])



    //delete record by id
    function deleteSales(id){
            axios.delete(`http://localhost:8070/sales/delete/${id}`)
            .then((result)=>{
                getSales();
            })
             .catch(()=>{
                 alert("Error");
            });
        }
  

   

    return (
        <div class="home-section">
        <div class="top">
        <Link id="add_btn"  to="/addSales" className="btn btn-dark">New Sale</Link>

        <Link id="report_btn"  to="/salesReport" class="btn btn-dark">Report</Link>


        
        <form id="search" 
         onChange={(e) => setSearch(e.target.value)}>

            <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
         
        </form>
        
         
        </div>

        <div class="details">
        <h3><b>Sales details</b></h3>
            <table class="table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Order Number</th>
                    <th>Items</th>
                    <th>Customer ID</th>
                    <th>Sale Value(Rs)</th>
                    <th>Status</th>
                    
                </tr>
                </thead>

                <tbody>
                {Sales.filter((post)=> {
                    return search === ''
                    ? post
                    : post.Date.toString().includes(search) ||
                    post.OrderNo.toString().includes(search) || 
                    post.CustomerID.toString().includes(search) /*||
                    post.Salesprice.toLowerCase().includes(search) || post.Salesprice.toUpperCase().includes(search) || post.Salesprice.includes(search)||
                    */;
                 
                })
                
                                
                //I have to get sales details from sales table
                .map((post) => (
                <tr key={post._id}>
                    <td>{post.Date.substring(0,10)}</td>
                    <td>{post.OrderNo}</td>
                    <td><button onClick={()=>{
                        navigate("/getOrderItems",
                        {
                            state: {        
                                OrderNo: `${post.OrderNo}`                              
                            }
                        });
                    }}id="viewbtn" style={{fontSize:"14px"}}>View</button></td>
                    <td>{post.CustomerID}</td>
                    <td>{post.Saleprice}</td>
                    <td>{post.Status}</td>
                    

                    <td><button onClick={()=>{
                        navigate("/UpdateSales",
                        {
                            state: {
                                id: `${post._id}`,
                                Date: `${post.Date}`,
                                OrderNo: `${post.OrderNo}`,
                                CustomerID: `${post.CustomerID}`,
                                Saleprice: `${post.Saleprice}`,
                                Status: `${post.Status}`,
                                
                            }
                        });
                    }}class="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                    <td><button onClick={()=>{
                        const confirmBox = window.confirm(
                            "Do you really want to delete"
                        )
                        if(confirmBox === true){
                            deleteSales(post._id);
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

 export default Sales;
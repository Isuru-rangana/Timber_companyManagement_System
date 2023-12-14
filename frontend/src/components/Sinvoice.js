import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'



function Sinvoice(){
    const navigate = useNavigate();  

    const[Sinvoice,setSinvoice] = useState([]);

    const[search,setSearch] = useState("");

    
    //fetch records
    function getSinvoice(){
        axios.get("http://localhost:8070/sinvoice").then((res)=>{
        setSinvoice(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getSinvoice();
    }, [])



    //delete record by id
    function deleteSinvoice(id){
            axios.delete(`http://localhost:8070/sinvoice/delete/${id}`)
            .then((result)=>{
                getSinvoice();
            })
             .catch(()=>{
                 alert("Error");
            });
        }
  

   

    return (
        <div class="home-section">
        <div class="top">
        <Link id="add_btn"  to="/addSinvoice" className="btn btn-dark">New Invoice</Link>

        


        
        <form id="search" 
         onChange={(e) => setSearch(e.target.value)}>

            <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
         
        </form>
        
         
        </div>

        <div class="details">
        <h3><b>Invoice details</b></h3>
            <table class="table">
                <thead>
                <tr>
                <th>Date</th>
                    <th>Invoice No</th>
                    <th>Supplier </th>
                    <th>Amount</th>
                    <th>Purchase Order Number</th>
                </tr>
                </thead>

                <tbody>
                {Sinvoice.filter((post)=> {
                    return search === ''
                    ? post
                    : post.invoiceNo.toLowerCase().includes(search) || post.supplier.toUpperCase().includes(search) 
                   
                 
                })
                
                                
                //I have to get customer details from customer table
                .map((post) => (
                <tr key={post._id}>
                     <td>{post.date.substring(0,10)}</td>
                    <td>{post.invoiceNo }</td>
                    <td>{post.supplier }</td>
                    <td>{post.amount} </td>
                    <td>{post.purchaseOrderNo}</td>
                    

                    <td><button onClick={()=>{
                        navigate("/UpdateSinvoice",
                        {
                            state: {
                                id: `${post._id}`,
                                date: `${post.date.substring(0,10)}`,
                                invoiceNo: `${post.invoiceNo}`,
                                supplier: `${post.supplier}`,
                                amount: `${post.amount}`,
                                purchaseOrderNo: `${post.purchaseOrderNo}`,
                            }
                        });
                    }}class="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                    <td><button onClick={()=>{
                        const confirmBox = window.confirm(
                            "Do you really want to delete"
                        )
                        if(confirmBox === true){
                            deleteSinvoice(post._id);
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

 export default Sinvoice;

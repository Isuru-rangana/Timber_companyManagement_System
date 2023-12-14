import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'


function AllFinances(){

    const navigate = useNavigate();  

    const[finances,setFinances] = useState([]);

    const[search,setSearch] = useState("");

    
    //fetch records
    function getFinances(){
        axios.get("http://localhost:8070/finance").then((res)=>{
        setFinances(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(()=>{
        getFinances();
    }, [])



    //delete record by id
    function deleteFinance(id){
            axios.delete(`http://localhost:8070/finance/delete/${id}`)
            .then((result)=>{
                getFinances();
            })
             .catch(()=>{
                 alert("Error ane");
            });
        }
  

   

    return (
        <div class="home-section">
            <div class="top">
                <Link id="add_btn"  to="/addFinance" className="btn btn-dark">New Record</Link>


                
                <form id="search" 
                onChange={(e) => setSearch(e.target.value)}>

                    <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
                
                </form>
                
            
            </div>

        <div class="details">
        <h3><b>Financial records</b></h3>
            <table class="table">
                <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Transaction Type</th>
                    <th>Amount</th>
                    <th>Transaction</th>
                    <th>Date of Transaction </th>
                </tr>
                </thead>

                <tbody>
                {finances.filter((post)=> {
                    return search === ''
                    ? post
                    : post.transaction_id.toLowerCase().includes(search) || post.transaction_id.toUpperCase().includes(search) || post.transaction_id.includes(search) ||
                    post.type.toLowerCase().includes(search) || post.type.toUpperCase().includes(search) || post.type.includes(search)||
                    post.transaction.toLowerCase().includes(search) || post.transaction.toUpperCase().includes(search) || post.transaction.includes(search);
                 
                })
                
                                
               
                .map((post) => (
                <tr key={post._id}>
                    <td>{post.transaction_id}</td>
                    <td>{post.type}</td>
                    <td>{post.amount}</td>
                    <td>{post.transaction}</td>
                    <td>{post.date.substring(0,10)}</td>
      
                    

                    <td><button onClick={()=>{
                        navigate("/updateFinance",
                        {
                            state: {
                                id: `${post._id}`,
                                transaction_id: `${post.transaction_id}`,
                                type: `${post.type}`,
                                amount: `${post.amount}`,
                                transaction: `${post.transaction}`,
                                date: `${post.date.substring(0,10)}`,
                                
                            }
                        });
                    }}className="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                    <td><button onClick={()=>{
                        const confirmBox = window.confirm(
                            "Do you really want to delete"
                        )
                        if(confirmBox === true){
                            deleteFinance(post._id);
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

 export default AllFinances;
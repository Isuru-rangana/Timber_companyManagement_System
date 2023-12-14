import React, {useState, useEffect} from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import axios from "axios";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'


function OrderItems(){
    const navigate = useNavigate();  
    const { state } = useLocation();
    const[OrderItems,setOrderItems] = useState([]);
    const [order, setOrderNo] = useState(`${state.OrderNo}`);

   

    //fetch records
    function getOrderItems(){
        axios.get(`http://localhost:8070/orderItem/${order}`).then((res)=>{
        setOrderItems(res.data);
        console.log(res.data)
        }).catch((err)=>{
            alert("No items added for the order")
        })
    }

    useEffect(()=>{
        getOrderItems();
    }, [])



    //delete record by id
    function deleteOrderItems(id){
            axios.delete(`http://localhost:8070/orderItem/delete/${id}`)
            .then((result)=>{
               
                getOrderItems();
            })
             .catch(()=>{
                 alert("Error");
            });
        }
  

    return (
        <div class="home-section">
        <div class="top">
        
        <Link id="add_btn"  to="/addOrderItems" className="btn btn-dark" 
        >Add Item</Link>

         
        </div>

        <div class="details">
        <h3><b>OrderItems details</b></h3>
            <table class="table">
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    
                </tr>
                </thead>

                <tbody>
                {OrderItems.map((post) => (
                <tr key={post._id}>

                    <td>{post.ItemNo}</td>
                    <td>{post.Quantity}</td>
                    

                    <td><button onClick={()=>{
                        navigate("/UpdateOrderItems",
                        {
                            state: {
                                id: `${post._id}`,
                                InvoiceNo: `${post.InvoiceNo}`,
                                Item: `${post.Item}`,
                                Quantity: `${post.Quantity}`,
                                
                            }
                        });
                    }}class="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                    <td><button onClick={()=>{
                        const confirmBox = window.confirm(
                            "Do you really want to delete"
                        )
                        if(confirmBox === true){
                            deleteOrderItems(post._id);
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

 export default OrderItems;
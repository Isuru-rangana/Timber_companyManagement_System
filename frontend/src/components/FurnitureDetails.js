import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import "./details.css"


function FurnitureDetails() {
    const navigate = useNavigate();  
    const [furniture, setFurniture] = useState([])
    const[search,setSearch] = useState("");

    function getFurniture  ()  {
      axios.get("http://localhost:8070/furniture").then((res)=>{
        setFurniture(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }


    useEffect(() => {
      getFurniture();
    }, [])
  


    function deleteFurniture(id){
      axios.delete(`http://localhost:8070/furniture/delete/${id}`)
      .then((result)=>{
          getFurniture();
      })
      .catch(()=>{
          alert("Error ane");
      });
    }


    return (
      <div class="home-section">
          <div class="top">
          <Link id="add_btn"  to="/addFurniture" className="btn btn-dark">New Furniture</Link>
          <form id="search" 
                onChange={(e) => setSearch(e.target.value)}>

                    <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
                
                </form>
        </div>
          <div class="details">
            <h3><b>All Furniture</b></h3>
                <table class="table">
                    <thead>
                    <tr>
                        <th>Furniture_No</th>
                        <th>Furniture_Name</th>
                        <th>Quantity</th>
                    
                    </tr>
                    </thead>

                    <tbody>

                    {furniture.filter((post)=> {
                    return search === ''
                    ? post
                    : post.Item_Code.toLowerCase().includes(search) || post.Item_Code.toUpperCase().includes(search) || post.Item_Code.includes(search) ||
                    post.Item_Name.toLowerCase().includes(search) || post.Item_Name.toUpperCase().includes(search) || post.Item_Name.includes(search);
                 
                })
                    
                    .map((post) => (
                    <tr key={post._id}>
                        <td>{post.Item_Code}</td>
                        <td>{post.Item_Name}</td>
                        <td>{post.Quantity}</td>

                        <td><button onClick={()=>{
                            navigate("/updateFurniture",
                            {
                                state: {
                                    id: `${post._id}`,
                                    Item_Code: `${post.Item_Code}`,
                                    Item_Name: `${post.Item_Name}`,
                                    Quantity: `${post.Quantity}`,
                                }
                            });
                        }}className="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                        <td><button onClick={()=>{
                            const confirmBox = window.confirm(
                                "Do you really want to delete"
                            )
                            if(confirmBox === true){
                                deleteFurniture(post._id);
                            }
                        }} className="deleteBtn"  style={{fontSize:"14px"}}>Delete</button></td>

                    </tr>            
                    ))}

                    </tbody>
                </table>

            </div>
            </div>
             
  );
}

export default FurnitureDetails;
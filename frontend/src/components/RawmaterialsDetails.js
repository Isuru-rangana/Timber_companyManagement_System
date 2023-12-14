import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import "./details.css"


function RawmaterialsDetails() {
    const navigate = useNavigate();  
    const [rawmaterials, setRawmaterials] = useState([])
    const[search,setSearch] = useState("");

    function getRawmaterial  ()  {
      axios.get("http://localhost:8070/rawMaterials").then((res)=>{
        setRawmaterials(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(() => {
      getRawmaterial();
    }, [])
  


    function deleteRawmaterials(id){
      axios.delete(`http://localhost:8070/rawMaterials/delete/${id}`)
      .then((result)=>{
          getRawmaterial();
      })
      .catch(()=>{
          alert("Error ane");
      });
    }


    return (
      <div class="home-section">
          <div class="top">
          <Link id="add_btn"  to="/addRawmaterials" className="btn btn-dark">New Material</Link>
          <form id="search" 
                onChange={(e) => setSearch(e.target.value)}>

                    <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
                
                </form>
          </div>

          <div class="details">
            <h3><b>All Raw Material</b></h3>
                <table class="table">
                    <thead>
                    <tr>
                        <th>Materials ID</th>
                        <th>Materials Name</th>
                        <th>Quantity</th>
                        <th>Price (1 product)</th>
                        
                    
                    </tr>
                    </thead>

                    <tbody>
                    {rawmaterials.filter((post)=> {
                    return search === ''
                    ? post
                    : post.Materials_Name.toLowerCase().includes(search) || post.Materials_Name.toUpperCase().includes(search) || post.Materials_Name.includes(search);
                 
                })
                    
                    
                   
                    .map((post) => (
                    <tr key={post._id}>
                        <td>{post.Materials_Id}</td>
                        <td>{post.Materials_Name}</td>
                        <td>{post.Quantity}</td>
                        <td>{post.Price}</td>



                        <td><button onClick={()=>{
                            navigate("/updateRawmaterials",
                            {
                                state: {
                                    id: `${post._id}`,
                                    Materials_ID: `${post.Materials_Id}`,
                                    Materials_Name: `${post.Materials_Name}`,
                                    Quantity: `${post.Quantity}`,
                                    Price: `${post.Price}`,
                                }
                            });
                        }}className="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                        <td><button onClick={()=>{
                            const confirmBox = window.confirm(
                                "Do you really want to delete"
                            )
                            if(confirmBox === true){
                                deleteRawmaterials(post._id);
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

export default RawmaterialsDetails;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import "./details.css"


function TimberlogsDetails() {
    const navigate = useNavigate();  
    const [timberlogs, setTimberlogs] = useState([])
    const[search,setSearch] = useState("");

    function getTimberlogs () {
      axios.get("http://localhost:8070/timberlog").then((res)=>{
        setTimberlogs(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }

    useEffect(() => {
      getTimberlogs();
    }, [])
  


    function deleteTimberlogs(id){
      axios.delete(`http://localhost:8070/timberlog/delete/${id}`)
      .then((result)=>{
          getTimberlogs();
      })
      .catch(()=>{
          alert("Error ane");
      });
    }


    return (
      <div class="home-section">
          <div class="top">
          <Link id="add_btn"  to="/addTimberlog" className="btn btn-dark">New Logs</Link>
          <Link id="report_btn"  to="/timberLogsReport" class="btn btn-dark">Report</Link>
          

          <form id="search" 
                onChange={(e) => setSearch(e.target.value)}>

                    <input style={{fontFamily: "Arial,FontAwesome", fontWeight: '400'}} class="form-control me-2" type="search" placeholder=" search" aria-label="Search"/>
                
                </form>
                </div>    
      
          <div class="details">
            <h3><b>All Timber Logs</b></h3>
                <table class="table">
                    <thead>
                    <tr>
                        <th>Log Number</th>
                        <th>Timber Type</th>
                        <th>Length (m)</th>
                        <th>Girth (m)</th>
                        <th>Volume (m^3)</th>
                        <th>Date</th>
                        
                    
                    </tr>
                    </thead>

                    <tbody>
                    
                    {timberlogs.filter((post)=> {
                    return search === ''
                    ? post
                    : post.Log_No.toLowerCase().includes(search) || post.Log_No.toUpperCase().includes(search) || post.Log_No.includes(search) ||
                    post.Timber_Type.toLowerCase().includes(search) || post.Timber_Type.toUpperCase().includes(search) || post.Timber_Type.includes(search)/*||
                    post.driverNIC.toLowerCase().includes(search) || post.driverNIC.toUpperCase().includes(search) || post.driverNIC.includes(search)||
                    post.drivingLicenseNo.toLowerCase().includes(search) || post.drivingLicenseNo.toUpperCase().includes(search) || post.drivingLicenseNo.includes(search)||
                    post.driverContactNo.toLowerCase().includes(search) || post.driverContactNo.toUpperCase().includes(search) || post.driverContactNo.includes(search)||
                    post.route.toLowerCase().includes(search) || post.route.toUpperCase().includes(search) || post.route.includes(search)*/;
                 
                })
                    
                    
                    .map((post) => (
                    <tr key={post._id}>
                        <td>{post.Log_No}</td>
                        <td>{post.Timber_Type}</td>
                        <td>{post.Length}</td>
                        <td>{post.Girth}</td>
                        <td>{post.Volume}</td>
                        <td>{post.Date.substring(0,10)}</td>



                        <td><button onClick={()=>{
                            navigate("/updateTimberlogs",
                            {
                                state: {
                                    id: `${post._id}`,
                                    Log_No: `${post.Log_No}`,
                                    Timber_Type: `${post.Timber_Type}`,
                                    Length: `${post.Length}`,
                                    Girth: `${post.Girth}`,
                                    Volume: `${post.Volume}`,
                                    Date: `${post.Date.substring(0,10)}`,
                                    
                                }
                            });
                        }}className="updateBtn" style={{fontSize:"14px"}}>Update</button></td>

                        <td><button onClick={()=>{
                            const confirmBox = window.confirm(
                                "Do you really want to delete"
                            )
                            if(confirmBox === true){
                                deleteTimberlogs(post._id);
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

export default TimberlogsDetails;
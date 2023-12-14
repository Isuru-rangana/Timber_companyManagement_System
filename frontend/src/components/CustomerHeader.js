import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {Link,useLocation} from 'react-router-dom';
import "./header.css";
import timber from '../images/timber2.png';



function CustomerHeader(){

	const [user, setUser] = useState([]);
    
    const getEmail=localStorage.getItem("emailData");

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL_2}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

    
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };



    return (
        <><div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
              <div className="logo-details">
                  <img id="logo" src={timber} />
                  <div className="logo_name">Wood Masters</div>
                  <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
              </div>
    
              <ul className="nav-list">
    
    
                  <li>
                      <Link to="/">
                          <i class='bx bxs-home' ></i>
                          <span className="links_name">Home</span>
                      </Link>
                      <span className="tooltip">Home</span>
                  </li>
    
                  <li>
                      <Link to="shoppingcart">
                          <i class='bx bx-cart'></i>
                          <span className="links_name">Shopping Cart</span>
                      </Link>
                      <span className="tooltip">Shopping Cart</span>
                  </li>
    
    

             

             {(getEmail)?(
                  <li class="profile">
                      <div class="profile-details">
        
                          <div class="name_job">
                                
                                <Link to="/userprofile">
                              
                                    
                                    <h5 id= "username">Profile</h5>

                                </Link>                      
                        
                          </div>
                      </div>               
                  </li>
             ):(
                  <li class="profile">
                      <div class="profile-details">
        
                          <div class="name_job">
                                
                                <Link to="/userprofile">
                              
                                    <img id="userpicture" src={user.picture} alt="Login" />
                                    <h5 id= "username">{user.name}</h5>
                                </Link>                      
                        
                          </div>
                      </div>               
                  </li>
                )}
               
                  
    
              </ul>
          </div>
          </>
      
        )

  }


export default CustomerHeader;
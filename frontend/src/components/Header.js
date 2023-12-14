import React, {useState} from "react";
import {Link} from 'react-router-dom';
import "./header.css";
import timber from '../images/timber2.png';



function Header(userDetails){
    const user = userDetails.user;

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <><div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="logo-details">
              <img id="logo" src={timber} />
              <div className="logo_name">Wood Masters</div>
              <i className="bx bx-menu" id="btn"  ></i>
          </div>

          <ul className="nav-list">


              <li>
                  <a href="#">
                      <i class='bx bxs-group'></i>
                      <span className="links_name">Employees</span>
                  </a>
                  <span className="tooltip">Employees</span>

                  <ul class="dropdown">
                  <li><Link to="getEmployees">Employee profile details</Link></li>
                    <li><Link to="getLeaveRequest">Leave Request</Link></li>
                    
                </ul>
              </li>

              <li>
                  <Link to="getFinances">
                      <i class='bx bx-money'></i>
                      <span className="links_name">Finance</span>
                  </Link>
                  <span className="tooltip">Finance</span>

                  <ul class="dropdown">
                  <li><Link to="/getFinances">Financial Records</Link></li>
                    <li><Link to="/salCalc">Salary Calculator</Link></li>
                    <li><Link to="/financeReport">Financial Summary</Link></li>
                    
                </ul>
              </li>

              <li>
                  <a href="#">
                      <i class='bx bx-bar-chart-alt'></i>
                      <span className="links_name">Sales</span>
                  </a>
                  <span className="tooltip">Sales</span>
                  <ul class="dropdown">
                    <li><Link to="getSales">Sales</Link></li>
                    <li><Link to="getCustomer">Customer details</Link></li>
                    
                </ul>
              </li>

              <li>
                  <Link to="getPurchase">
                      <i class='bx bx-purchase-tag'></i>
                      <span className="links_name">Purchase</span>
                  </Link>
                  <span className="tooltip">Purchase</span>
                  <ul class="dropdown">
                    <li><Link to="getPurchase">Purchase Order</Link></li>
                    <li><Link to="getSupplier">Supplier details</Link></li>
                    <li><Link to="getSinvoice">Invoice details</Link></li>
                </ul>
              </li>


              <li>
                  <Link to="#">
                      <i class='bx bxs-truck'></i>
                      <span className="links_name" >Transport</span>
                  </Link>
                  <span className="tooltip">Transport</span>


                <ul class="dropdown">
                    <li><Link to="getVehicles">Vehicle details</Link></li>
                    <li><Link to="getTransportation">Logs Transport history</Link></li>
                    <li><Link to="getDelivery">Furniture Delivery</Link></li>
                </ul>
              </li>


              <li>
                  <Link to="getProducts">
                      <i class='bx bxs-factory'></i>
                      <span class="links_name">Manufacture</span>
                  </Link>
                  <span class="tooltip">Manufacture</span>
              </li>
              
            

              <li>
                  <a href="#">
                      <i class='bx bx-store'></i>
                      <span className="links_name">Inventory</span>
                  </a>
                  <span className="tooltip">Inventory</span>

                  <ul class="dropdown">
                    <li><Link to="getTimberlogs">Timber Logs</Link></li>
                    <li><Link to="getRawMaterials">Raw Materials</Link></li>
                    <li><Link to="getFurniture">Furniture</Link></li>
                </ul>
              </li>





              <li class="profile">
                  <div class="profile-details">
                      <Link to="userprofile">
                        <img id="userpicture" src={user.picture} alt="Login" />
                        <h5 id= "username">{user.name}</h5>
                      </Link>
                  </div>
              </li>

          </ul>
      </div>
      </>

        

    )
}

export default Header;
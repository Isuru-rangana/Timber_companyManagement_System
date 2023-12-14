import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import AddLeaveRequest from './components/AddLeaveRequest';

import CustomerHeader from './components/CustomerHeader';
import ShoppingCart from './components/ShoppingCart';

import './App.css';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';

import Header from './components/Header';
import VehicleDetails from './components/VehicleDetails';
import AddVehicle from './components/AddVehicle';
import UpdateVehicle from './components/UpdateVehicle';
import TransportReport from './components/TransportReport';
import LogsTransportHistory from './components/LogsTransportHistory';
import AddLogsTransport from './components/AddLogsTransport';
import UpdateLogsTransport from './components/UpdateLogsTransport';
import DeliveryDetails from './components/DeliveryDetails';
import AddDelivery from './components/AddDelivery';
import UpdateDelivery from './components/UpdateDelivery';
import DriverDetails from './components/DriverDetails';
import CustomerDetails from './components/CustomerDetails';

import AddProduct from './components/AddProduct';
import ProductDetails from './components/ProductDetails';
import UpdateProduct from './components/UpdateProduct';

import Sales from './components/Sales';
import AddNewSales from './components/AddNewSales';
import UpdateSales from './components/UpdateSales';
import Customer from './components/customer';
import AddCustomer from './components/AddCustomer';
import UpdateCustomer from './components/UpdateCustomer';
import OrderItems from './components/OrderItems';
import SalesReport from "./components/SalesReport";
import UpdateOrderItems from './components/UpdateOrderItems';
import AddOrderItems from './components/AddOrderItems';

import UpdateEmployees from './components/UpdateEmployees';
import AddEmployee from './components/AddEmployee';
import EmployeeDetails from './components/EmployeeDetails';


import AllFinances from './components/AllFinances';
import AddFinance from './components/addFinance';
import UpdateFinance from './components/updateFinance';
import EmployeeSalary from './components/EmployeeSalary';
import FinanceReport from './components/FinanceReport';

import LeaveRequestDetails from './components/LeaveRequest';
import UpdateLeave from './components/UpdateLeave';
import LeaveReport from './components/LeaveReport';

import TimberlogsDetails from './components/TimberlogsDetails';
import AddTimberlogs from './components/AddTimberlogs';
import UpdateTimberlogs from './components/UpdateTimberlogs';
import RawmaterialsDetails from './components/RawmaterialsDetails';
import AddRawmaterials from './components/AddRawmaterials';
import UpdateRawmaterials from './components/UpdateRawmaterials';
import FurnitureDetails from './components/FurnitureDetails';
import AddFurniture from './components/AddFurniture';
import UpdateFurniture from './components/UpdateFurniture';
import TimberLogsReport from "./components/TimberLogsReport";

import Purchase from './components/Purchase';
import AddPurchase from './components/AddPurchase';
import UpdatePurchase from './components/UpdatePurchase';
import Sinvoice from "./components/Sinvoice";
import AddSinvoice from "./components/AddSinvoice";
import UpdateSinvoice from "./components/UpdateSinvoice";
import Supplier from "./components/Supplier";
import AddSupplier from "./components/AddSupplier";
import UpdateSupplier from "./components/UpdateSupplier"
import PurchaseReport from "./components/PurchaseReport";

import ConfirmOrder from './components/ConfirmOrder';
import MyOrders from './components/MyOrders';

function App() {
  const [user, setUser] = useState(null);

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

  const mail = 'isururangana781@gmail.com';

  if (user) {
    /*function getEmail(){
        axios.get(`http://localhost:8070/manager/${user.email}`).then((res)=>{
        setEmail(res.data);
        })
    }

	getEmail();*/

    if (user.email === mail) {
      return (
        <div id="body">
          <BrowserRouter>
            <Header user={user} />

            <Routes>
              <Route path="/updateVehicle" element={<UpdateVehicle />} />
              <Route path="/getVehicles" element={<VehicleDetails />} />
              <Route path="/addVehicle" element={<AddVehicle />} />
              <Route path="/getDriver" element={<DriverDetails />} />
              <Route
                path="/getTransportation"
                element={<LogsTransportHistory />}
              />
              <Route path="/addTransportation" element={<AddLogsTransport />} />
              <Route
                path="/updateTransportation"
                element={<UpdateLogsTransport />}
              />
              <Route path="/getDelivery" element={<DeliveryDetails />} />
              <Route path="/addDelivery" element={<AddDelivery />} />
              <Route path="/updateDelivery" element={<UpdateDelivery />} />
              <Route path="/getCus" element={<CustomerDetails />} />

              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/getProducts" element={<ProductDetails />} />
              <Route path="/updateProduct" element={<UpdateProduct />} />

              <Route path="/getSales" element={<Sales />} />
              <Route path="/addSales" element={<AddNewSales />} />
              <Route path="/updateSales" element={<UpdateSales />} />
              <Route path="/getCustomer" element={<Customer />} />
              <Route path="/addCustomer" element={<AddCustomer />} />
              <Route path="/updateCustomer" element={<UpdateCustomer />} />
              <Route path="/getOrderItems" element={<OrderItems />} />
			  <Route path="/salesReport" element={<SalesReport/>} />
			  <Route path="/addOrderItems" element={<AddOrderItems/>}/>
			  <Route path='/updateOrderItems' element={<UpdateOrderItems/>}/>

              <Route path="/getEmployees" element={<EmployeeDetails />} />
              <Route path="/updateEmployee" element={<UpdateEmployees />} />
              <Route path="/addEmployee" element={<AddEmployee />} />

              <Route path="/addFinance" element={<AddFinance />} />
              <Route path="/getFinances" element={<AllFinances />} />
              <Route path="/updateFinance" element={<UpdateFinance />} />
              <Route path="/financeReport" element={<FinanceReport/>}/>
              <Route path="/salCalc" element={<EmployeeSalary/>}/>

              <Route
                path="/getLeaveRequest"
                element={<LeaveRequestDetails />}
              />
              <Route path="/AddLeaveRequest" element={<AddLeaveRequest />} />
              <Route path="/updateLeave" element={<UpdateLeave />} />
              <Route path="/LeaveReport" element={<LeaveReport/>}/>

              <Route path="/updateTimberlogs" element={<UpdateTimberlogs />} />
              <Route path="/getTimberlogs" element={<TimberlogsDetails />} />
              <Route path="/addTimberlog" element={<AddTimberlogs />} />
              <Route path="/timberLogsReport" element={<TimberLogsReport/>}/>
              <Route
                path="/updateRawmaterials"
                element={<UpdateRawmaterials />}
              />
              <Route
                path="/getRawmaterials"
                element={<RawmaterialsDetails />}
              />
              <Route path="/addRawmaterials" element={<AddRawmaterials />} />
              <Route path="/updateFurniture" element={<UpdateFurniture />} />
              <Route path="/getFurniture" element={<FurnitureDetails />} />
              <Route path="/addFurniture" element={<AddFurniture />} />

              <Route path="/addPurchase" element={<AddPurchase />} />
              <Route path="/getPurchase" element={<Purchase />} />
              <Route path="/updatePurchase" element={<UpdatePurchase />} />
              <Route path="/getSupplier" element={<Supplier/>}/>
              <Route path="/addSupplier" element={<AddSupplier/>}/>
              <Route path="/updateSupplier" element={<UpdateSupplier/>}/>
              <Route path="/getSinvoice" element={<Sinvoice/>}/>
              <Route path="/addSinvoice" element={<AddSinvoice/>}/>
              <Route path="/updateSinvoice" element={<UpdateSinvoice/>}/>
              <Route path="/purchaseReport" element={<PurchaseReport/>}/>

              <Route path="/transportReport" element={<TransportReport />} />

              <Route
                exact
                path="/userprofile"
                element={
                  user ? <UserProfile user={user} /> : <Navigate to="/login" />
                }
              />

              <Route
                exact
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />

              <Route
                path="/signup"
                element={user ? <Navigate to="/" /> : <Signup />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <div id="body">
          <BrowserRouter>
            <CustomerHeader />

            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                path="/shoppingcart"
                element={<ShoppingCart user={user} />}
              />
              <Route exact path="/confirmOrder" element={<ConfirmOrder />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/updateProfile" element={<UpdateProfile />} />
              <Route path="/myOrders" element={<MyOrders />} />

              <Route
                exact
                path="/userprofile"
                element={
                  user ? <UserProfile user={user} /> : <Navigate to="/login" />
                }
              />
              <Route
                exact
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/" /> : <Signup />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      );
    }
  } else {
    return (
      <div id="body">
        <BrowserRouter>
          <CustomerHeader />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/shoppingcart"
              element={<ShoppingCart user={user} />}
            />
            <Route path="/myOrders" element={<MyOrders />} />
            <Route exact path="/confirmorder" element={<ConfirmOrder />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route
              exact
              path="/userprofile"
              element={
                user ? <UserProfile user={user} /> : <Navigate to="/login" />
              }
            />
            <Route
              exact
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
         
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

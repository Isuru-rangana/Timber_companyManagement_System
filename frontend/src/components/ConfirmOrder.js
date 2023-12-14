import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './header.css';
import './details.css';
//import { useCart } from './CartContext';

function ConfirmOrder() {
  /*const getEmail = localStorage.getItem('emailData');
  const [user, setUser] = useState([]);

  //const [email, setEmail] = useState("");

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL_2}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
      //setEmail(user.email);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);*/

  //const { totQuantity, totPrice } = useCart();

  const { state } = useLocation();
  const navigate = useNavigate();

  const [customerId, setCustomerId] = useState('');

  const [TotalQuantity, setTotQuantity] = useState(`${state.TotalQuantity}`);
  const [TotalPrice, setTotPrice] = useState(`${state.TotalPrice}`);
  const [Email, setEmail] = useState(`${state.Email}`);
  const [cus, setCus] = useState([]);

  const getEmail=localStorage.getItem("emailData");
  
  /*function getCustomer() {
    axios
      .get(`http://localhost:8070/customer/profile/${Email}`)
      .then((res) => {
        setCustomerId(res.data.CustomerID);
      })
      .catch((err) => {
        alert(err);
      });
  }
  useEffect(() => {
    getCustomer();
  }, []);*/

  function sendData() {
    const newSale = {
      //email: user.email || getEmail,
      //Email,
      //customerId,
      TotalPrice,
      TotalQuantity,
      
    };

    axios
      .post('http://localhost:8070/sales/add', newSale)
      .then(() => {
        alert('New sale added successfully');
        console.log('added');
      })
      .catch((err) => {
        alert(err);
      });
  }




  const [count, setCount] = useState([]);


  function getCount(){
    axios.get("http://localhost:8070/counter/get/6452657b898f69c60a9346d0").then((res)=>{
    setCount(res.data);
    console.log(res.data);
    }).catch((err)=>{
        alert(err);
    })
}

useEffect(()=>{
    getCount();
}, [])

console.log(count);


  function sendData(){

    const newSale = {
      CustomerID:state.CustomerID,
      Saleprice : state.TotalPrice,     
    }

    axios.post('http://localhost:8070/sales/cus/add', newSale).then(()=>{
        alert("You Placed the Order Successfully");
      
    }).catch((err)=>{
        alert(err);
    });

    

    
    for (let i = 0; i < 5; i++){
      const newItem = {
        OrderNo:count.counter.count + 1,
        ItemNo:state.Items[i].itemNo,
        Quantity:state.Items[i].quantity,

      }
      console.log(newItem.OrderNo);
      console.log(newItem.ItemNo);
      console.log(newItem.Quantity);

      axios.post('http://localhost:8070/orderItem/add', newItem).then(()=>{
      }).catch((err)=>{
          alert("Error Occured");
      });

    }


  }



  return (
    <div class="home-section">
      <h2 className="form_head">- Confirm Order -</h2>
      <div className="container">
        <h5>
          Total sales quantity : <b>{TotalQuantity}</b>
        </h5>
        <h5>
          Total sales price : <b>Rs.{TotalPrice}</b>
        </h5>
        <h5>
          Payment type : <b>Cash on delivery</b>
        </h5>
        <button
          onClick={sendData}
          id="add_btn"
          style={{ display: 'inline-block', fontSize: '16px' }}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmOrder;

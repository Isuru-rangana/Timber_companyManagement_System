import React, { useState } from "react";
import axios from "axios";
import "./details.css"
import "./header.css"
import {Link,  useNavigate } from 'react-router-dom';

function AddFinance() {
  const navigate = useNavigate();  

  const [transaction_id, setTransactionID] = useState("");
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");
  const [date, setDate] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newFinance = {
        transaction_id, 
        transaction,
        amount,
        type,
        date
    }

    axios.post("http://localhost:8070/finance/add", newFinance)
      .then(() => {
        alert("Finance added");
        navigate("/getFinances")
      })
      .catch((err) => {
        alert(err);
      })
  }

  return (
    <div className="home-section">
      <h2 className="form_head">Enter Transaction Details</h2>
      <form className="formContent" onSubmit={sendData}>
        <div className="mb-3">
          <label className="form-label">Transaction ID</label><br/>
          <input type="text" className="formInput" required minLength="5" maxLength="7"
            title="Enter Valid Transaction ID as seen in Receipt"
            onChange={(e) => {
              setTransactionID(e.target.value);
            }} />
        </div>

        <div className="mb-3">
          <label className="form-label">Transaction type</label><br/>
          <select className="formInput" onChange={(e) => {
              setType(e.target.value);
            }}>
              <option value="Income" selected>Income</option>
              <option value="Expense" >Expense</option>
              <option value="Bills, rents or Mortgages" >Bills, rents or Mortgages</option>
              <option value="Investments" >Investments</option>
              <option value="Crane Lorry - Half Type" >Crane Lorry - Half Type</option>
           </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Transaction Amount</label><br/>
          <input type="number" className="formInput" required min="0"
            onChange={(e) => {
              setAmount(e.target.value);
            }} />
        </div>

        <div className="mb-3">
          <label className="form-label">Transaction</label><br/>
          <input type="text" className="formInput" required
            onChange={(e) => {
              setTransaction(e.target.value);
            }} />
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Transaction</label><br/>
          <input type="date" className="formInput" required 
            onChange={(e) => {
              setDate(e.target.value);
            }} />
        </div>
        
          <Link to="/getFinances" className="backBtn">
           Back
          </Link>
        
                     

        <button type="submit" className="updateBtn">Submit</button>
                </form>
            </div>
       
    )
} 

 export default AddFinance;
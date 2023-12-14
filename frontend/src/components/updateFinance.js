import React, {useState, useEffect} from "react";
import {Link, useLocation,useNavigate} from 'react-router-dom';
import axios from "axios";

import "./details.css";



function UpdateFinance(){

    const { state } = useLocation();

   
        const [transaction_id, setTransactionID] = useState(`${state.transaction_id}`);
        const [transaction, setTransaction] = useState(`${state.transaction}`);
        const [amount, setAmount] = useState(`${state.amount}`);
        const [type, setType] = useState(`${state.type}`);
        const [date, setDate] = useState(`${state.date}`);
  
       

        function updateData(e){
            e.preventDefault();

            const newFinance = {
                transaction_id, 
                transaction,
                amount,
                type,
                date
            }

            axios.put(`http://localhost:8070/finance/update/${state.id}`, newFinance).then(()=>{
                alert("Financial Record updated");
            }).catch((err)=>{
                alert(err);
            })

        }




        return (
            <div className="home-section">
                <h2 className="form_head">Update Transaction Details</h2>
                    <form className="formContent" onSubmit={updateData}>
                    <div className="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Transaction ID</label><br/>
                    <input type="text" className="formInput" value={transaction_id} minLength="5" maxLength="7"
                    onChange={(e)=>{
                        setTransactionID(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Transaction Type</label><br/>
                    <select className="formInput"  value={type} onChange={(e) => {
                    setType(e.target.value);
                    }}>
                        <option value="Income" selected>Income</option>
                        <option value="Expense" >Expense</option>
                        <option value="Bills, rents or Mortgages" >Bills, rents or Mortgages</option>
                        <option value="Investments" >Investments</option>
                        <option value="Crane Lorry - Half Type" >Crane Lorry - Half Type</option>
                    </select>
                    
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Transaction Amount</label><br/>
                    <input type="number" className="formInput" value={amount}
                    onChange={(e)=>{
                        setAmount(e.target.value);
                    }} />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Transaction</label><br/>
                    <input type="text" className="formInput" value={transaction}
                    onChange={(e)=>{
                        setTransaction(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Date of Transaction</label><br/>
                    <input type="date" className="formInput" value={date}
                    onChange={(e)=>{
                        setDate(e.target.value);
                    }}/>
                </div> 

                <Link to="/getFinances" className="backBtn">
                 Back
                 </Link>              
              

                <button type="submit" className="updateBtn">Update</button>
                </form>
            </div>
        )

}

export default UpdateFinance;
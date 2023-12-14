import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import ReactPrint from "react-to-print";
import "./details.css";
import "./header.css";
import search_icon from '../images/search_icon.png'



function TimberLogsReport(){

    const navigate = useNavigate();  

    const ref = useRef();


    const [buttonClicked, setButtonClicked] = useState(false);

    const [records, setRecords] = useState([]);
    const [year, setYear] = useState('2023');
    const [month, setMonth] = useState('');


    const years = Array.from({ length: 50 }, (_, index) => index + 2010);
  
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/timberlog/report/${year}/${month}`);
        setRecords(response.data);
        console.log(response.data);

      } catch (error) {
        console.log(error);
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setButtonClicked(true);
      fetchRecords();
    };




if(!buttonClicked){

    return (
      <div class="home-section">
      <div class="report" >

      
      
      </div>

      <div class="details" >
      <h3 id="monthReport"><b>Monthly Timber Logs Report</b></h3>


        <form onSubmit={handleSubmit}>
            <label>
            Year :
            <select className="reportInput" value={year} onChange={(event) => setYear(event.target.value)}>
              {years.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
            </label>

            <label>
            Month :
            <select required className="reportInput" value={month} onChange={(event) => setMonth(event.target.value)}>
                 <option value="1" >January</option>
                 <option value="2">February</option>
                 <option value="3">March</option>
                 <option value="4">April</option>
                 <option value="5" >May</option>
                 <option value="6" >June</option>
                 <option value="7">July</option>
                 <option value="8">August</option>                
                 <option value="9" >September</option>
                 <option value="10">October</option>
                 <option value="11">November</option>
                 <option value="12">December</option>

            </select>
            </label>
            <button type="submit" className="generateBtn">Generate</button>

            <Link to="/getTimberLogs" className="reportBackBtn">
                Back
            </Link>
        </form>

      </div>
      </div>
    )
}

else if(!records[0]){
    return (
      <div class="home-section">
      <div class="report" >

      
      
      </div>

      <div class="details" >
      <h3 id="monthReport"><b>Monthly Timber Logs Report</b></h3>


        <form onSubmit={handleSubmit}>
            <label>
            Year :
            <select className="reportInput" value={year} onChange={(event) => setYear(event.target.value)}>
              {years.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
            </label>

            <label>
            Month :
            <select required className="reportInput" value={month} onChange={(event) => setMonth(event.target.value)}>
                 <option value="1" >January</option>
                 <option value="2">February</option>
                 <option value="3" >March</option>
                 <option value="4">April</option>
                 <option value="5" >May</option>
                 <option value="6" >June</option>
                 <option value="7">July</option>
                 <option value="8">August</option>                
                 <option value="9" >September</option>
                 <option value="10">October</option>
                 <option value="11">November</option>
                 <option value="12">December</option>

            </select>
            </label>
              
            <button type="submit" className="generateBtn">Genarate</button>

            <Link to="/getTimberLogs" className="reportBackBtn">
                Back
            </Link>
        </form>

        <h2 className="error">There are no records for the given month</h2>

      </div>
      </div>
    )
} 

else {
  return (
      <div class="home-section">
      <div class="details">
      <h3 id="monthReport"><b>Monthly Timber Logs Report</b></h3>


      <form onSubmit={handleSubmit}>
          <label>
          Year :
          <select className="reportInput" value={year} onChange={(event) => setYear(event.target.value)}>
            {years.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
          </label>

          <label>
          Month :
          <select required className="reportInput" value={month} onChange={(event) => setMonth(event.target.value)}>
               <option value="1" >January</option>
               <option value="2">February</option>
               <option value="3" >March</option>
               <option value="4">April</option>
               <option value="5" >May</option>
               <option value="6" >June</option>
               <option value="7">July</option>
               <option value="8">August</option>                
               <option value="9" >September</option>
               <option value="10">October</option>
               <option value="11" >November</option>
               <option value="12">December</option>

          </select>
          </label>
          <button type="submit" className="generateBtn">Genarate</button>

          <Link to="/getTimberLogs" className="reportBackBtn">
              Back
          </Link>
      </form>

      <ReactPrint trigger={() => <button className="printBtn">Print</button>} content={() => ref.current} />

      <div id="reportContainer" ref={ref}>
      <h1 className="reportHead1"  >Wood Masters</h1>
      <h3 className="reportHead2">Monthly Timber Logs Report - {year}/0{month}</h3>
          <table  id="myTable" >
              <thead>
              <tr >
                  <th rowSpan="2">Timber Log Number</th>
                  <th rowSpan="2">Length</th>
                  <th rowSpan="2">Girth</th>
                  <th rowSpan="2">Volume</th>
                  <th rowSpan="2">Timber Type</th>
                  
              </tr>
         
         
              </thead>

              <tbody>
              {records.map((record) => (
              <tr  key={record._id}>
                  <td>{record.Log_No}</td>
                  <td>{record.Length}</td>
                  <td>{record.Girth}</td>
                  <td>{record.Volume}</td>
                  <td>{record.Timber_Type}</td>

        
       
              </tr>            
              ))}

              </tbody>
          </table>
      </div>
    </div>
    </div>
    
  )
} 

}

 export default TimberLogsReport;

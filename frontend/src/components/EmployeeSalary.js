import React, { useState } from "react";
import "./details.css"
import "./header.css"


function EmployeeSalary(){

    const [salary, setSalary] = useState();
    var [tax, setTax] = useState();
    var [netSal, setNetSal] = useState();
    const [NPLeaves, setNPLeaves] = useState();
    const [OTHours, setOTHours] = useState();
    const [DTHours, setDTHours] = useState();

function Calculation(){

    if(salary > 100000){
        tax = salary * 10/100;
    }
    else if (salary > 50000) {
        tax = salary * 5/100;
    }
    else{
        tax = 0;
    }

    setTax(tax);

    netSal = (salary - tax) + (OTHours*2000) + (DTHours*3000);

    setNetSal(netSal);




}



    return (
        
        <div className="home-section">
            <h3>Empolyee Salary Calculator</h3>
            
            <div class="form-group">
                <label>Employee Salary</label>
                <input type="text" class="form-control" placeholder="Employee Salary" 
                onChange={(e) => {
              setSalary(e.target.value);
            }} />
            </div>

            <div class="form-group">
                <label>Overtime Hours</label>
                <input type="text" class="form-control" placeholder="Overtime Hours" 
                required min="0"
                onChange={(e) => {
              setOTHours(e.target.value);
            }} />
            </div>

            <div class="form-group">
                <label>Double Time Hours</label>
                <input type="text" class="form-control" placeholder="Double Time Hours"
                required min="0" 
                onChange={(e) => {
              setDTHours(e.target.value);
            }} />
            </div>

            <div class="form-group">
                <fieldset disabled="true">
                <label>Tax</label>
                <input type="text" class="form-control" placeholder="Tax (For Salaries Above 50000, Rates may vary)" hint="Automatically Calculated" value={tax} />
                </fieldset>
            </div>

            <div class="form-group">
                <fieldset disabled="true">
                <label>Net Salary</label>
                <input type="text" class="form-control" placeholder="Net Salary" value={netSal} />
                </fieldset>
            </div>

           

            

            <button type="submit" onClick={Calculation} class="btn btn-primary">Submit</button>
        </div>
    );
}

export default EmployeeSalary;
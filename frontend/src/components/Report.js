import React, {useEffect} from 'react';
import Plotly from 'plotly.js/dist/plotly-cartesian';




function Report(){

    
  const data = [{
    values: [19, 26, 55],
    labels: ['Residential', 'Non-Residential', 'Utility'],
    type: 'pie'
  }];

  const layout = {
    height: 400,
    width: 500
  };

  useEffect(() => {
    Plotly.newPlot('myDiv', data, layout);
  }, []);


  return (

      <div id="myDiv" />
      
  );


};

export default Report;

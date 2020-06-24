import React, { Component } from "react";
import Chart from "react-apexcharts";
import {useEffect , useState} from 'react';
import io from 'socket.io-client';





const socket = io('http://localhost:5000/');
if(socket !== undefined){
    console.log("Socket connected");
}








const LineDemo = () => {


 

  // Setting Data for SubPlot 2

  const [Plot2_x,setPlot2_x]=useState([]);
  const [Plot2_L1,setPlot2_L1]=useState([]);
 
  if(Plot2_L1.length > 10){
    Plot2_L1.shift();
  }
  if(Plot2_x.length > 10){
    Plot2_x.shift();
  }
  useEffect(()=>{
 

        

        socket.on('Subplot2',(res) =>{
          const data1 = res[0].Time
          setPlot2_x(currData => [...currData,data1]);
  
          const data2 = res[0].Open
          setPlot2_L1(currData => [...currData,data2]);
          
          
          }); 
   },[]);
  

    const state = {
      options: {
        chart: {
          id: "basic-bar",
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          }
        },
        xaxis: {
         categories: Plot2_x
            
        },
        markers: {
            size: 1,
        }
      },
      
     
       
      series2: [
        {
          name: "Subplot-2-L-1",
          data: Plot2_L1
        }
          
      ]
    };
  
  
  
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
           
            <Chart id="subplot2"
              options={state.options}
              series={state.series2}
              width="100%"
              height="250"
            />
          </div>
        </div>
      </div>
    );
  
}

export default LineDemo;
import React, { Component } from "react";
import Chart from "react-apexcharts";
import {useEffect , useState} from 'react';
import io from 'socket.io-client';





const socket = io('http://localhost:5000/');
if(socket !== undefined){
    console.log("Socket connected");
}








const Stock = () => {


  // Setting Data for SubPlot 1 

  const [Plot1_x,setPlot1_x]=useState([]);
  const [Plot1_L1,setPlot1_L1]=useState([]);
  const [Plot1_L2,setPlot1_L2]=useState([]);
  const [Plot1_L3,setPlot1_L3]=useState([]);
  const [Plot1_L4,setPlot1_L4]=useState([]);

  // Setting Data for SubPlot 2

  const [Plot2_x,setPlot2_x]=useState([]);
  const [Plot2_L1,setPlot2_L1]=useState([]);
  const [Plot2_L2,setPlot2_L2]=useState([]);


  useEffect(()=>{
    socket.on('Subplot1',(res) =>{
        const data1 = res[0].Time
        setPlot1_x(currData => [...currData,data1]);

        const data2 = res[0].Open
        setPlot1_L1(currData => [...currData,data2]);
        
        const data3 = res[0].High
        setPlot1_L2(currData => [...currData,data3]); 
        
        const data4 = res[0].Low
        setPlot1_L3(currData => [...currData,data4]);

        const data5 = res[0].Close
        setPlot1_L4(currData => [...currData,data5]);
        }); 

        

        socket.on('Subplot2',(res) =>{
          const data1 = res[0].Time
          setPlot2_x(currData => [...currData,data1]);
  
          const data2 = res[0].Open
          setPlot2_L1(currData => [...currData,data2]);
          
          const data3 = res[0].High
          setPlot2_L2(currData => [...currData,data3]); 
          
          }); 
   },[]);
  

    const state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
         categories: Plot1_x || Plot2_x
            
        },
        markers: {
            size: 1,
        }
      },
      
      series: [
        {
          name: "L-1",
          data: Plot1_L1
        },
        {
            name: "L-2",
            data: Plot1_L2
          },
          {
            name: "L-3",
            data: Plot1_L3
          },
          {
              name: "L-4",
              data: Plot1_L4
            }
      ],
       
      series2: [
        {
          name: "Subplot-2-L-1",
          data: Plot2_L1
        },
        {
            name: "Subplot-2-L-2",
            data: Plot2_L2
          }
          
      ]
    };
  
  
  
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart id="subplot1"
              options={state.options}
              series={state.series}
              type="line"
              width="100%"
              height="350"
            />
            
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

export default Stock;
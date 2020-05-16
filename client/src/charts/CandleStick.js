//import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import React from 'react';
import {useEffect , useState} from 'react';
import axios from 'axios';






const CandleStick = () =>{


    const [chartdata,setData]=useState([]);
    // const [highData,setData2]=useState([]);
    // const [lowData,setData3]=useState([]);
    // const [closeData,setData4]=useState([]);
    // const [timeData,setData5]=useState([]);
  
    

    useEffect(()=>{

        function axiosTest() {
          return axios.get('http://localhost:5000/users').then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data
          })
        }
        
        
        axiosTest().then(exdata => {
          for(var i=0;i<26;i++){
            setData(currData => [...currData,chartdata[i]={x:exdata[i].Time , y: [exdata[i].Open,exdata[i].High,exdata[i].Low,exdata[i].Close]}]);
          }
          
          // const data1 = exdata[0].Open
          // console.log(data1);
          // setData(currData => [...currData,data1]);
          
          // const data2 = exdata[0].High
          // setData2(currData => [...currData,data2]);
          
          // const data3 = exdata[0].Low
          // setData3(currData => [...currData,data3]);
          
          // const data4 = exdata[0].Close
          // setData4(currData => [...currData,data4]);

          // const data5 = exdata[0].Time
          // setData5(currData => [...currData,data5]);
   
           
        })
    
      },[]);

  
 
      //console.log("char",chartdata);
      const dx = {
        
        series: [{
          data: chartdata
        }],
        options: {
          chart: {
            type: 'candlestick',
            height: 350
          },
          title: {
            text: 'CandleStick Chart',
            align: 'left'
          },
          xaxis: {
            type: 'category'
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        },
      
      
      };

      return(
        <div id="chart">
        <ReactApexChart options={dx.options} series={dx.series} type="candlestick" height={350} />
        </div>

      );


    }

  
export default CandleStick;





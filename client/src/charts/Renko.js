import "@grapecity/wijmo.styles/wijmo.css";
//import "bootstrap.css";
//import "./app.css";
//
import * as React from 'react';
//import * as ReactDOM from 'react-dom';
//
//import * as wjCore from "@grapecity/wijmo";
import * as wjChart from "@grapecity/wijmo.react.chart";
//import * as wjInput from "@grapecity/wijmo.react.input";
import * as wjFinance from "@grapecity/wijmo.react.chart.finance";
import axios from 'axios';
import {useEffect , useState} from 'react';

  



const Renko =()=> {
    
    const [chartdata,setData]=useState([]);
    useEffect(()=>{
    function axiosTest() {
        return axios.get('http://localhost:5000/users').then(response => {
          // returning the data here allows the caller to get it through another .then(...)
          return response.data
        })
      }
      
      
      axiosTest().then(exdata => {
        for(var i=0;i<26;i++){
          setData(currData => [...currData,chartdata[i]={"date":exdata[i].Time , "open":exdata[i].Open,"high":exdata[i].High,"low":exdata[i].Low,"close":exdata[i].Close}]);
       
        }
     });
    },[]);
    
     console.log("datajsx",chartdata);


    
        const datavalue = {
            data: chartdata,
            options: {
                renko: {
                    boxSize: 2,
                    rangeMode: 'Fixed',
                    fields: 'Close'
                }
            },
            style: {
                stroke: 'rgb(136, 189, 230)',
                fill: 'rgba(136, 189, 230, 0.701961)'
            },
            altStyle: {
                stroke: 'rgb(136, 189, 230)',
                fill: 'transparent'
            }
        };
    

    
    
        //console.log(getData());
        return <div className="container-fluid">
            
            
            
            <wjFinance.FinancialChart  itemsSource={datavalue.data} bindingX="date" chartType="Renko" options={datavalue.options} tooltipContent="tooltip">
                <wjFinance.FinancialChartSeries binding="high,low,open,close" name="Facebook" style={datavalue.style} altStyle={datavalue.altStyle}></wjFinance.FinancialChartSeries>
                <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
            </wjFinance.FinancialChart>
        </div>;
    
    
   
    
    
   
}

export default Renko;

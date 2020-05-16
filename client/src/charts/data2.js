import axios from 'axios';
import {useEffect , useState} from 'react';
import React from 'react';

const Datax=()=>{


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
 return chartdata;

}


export default Datax;
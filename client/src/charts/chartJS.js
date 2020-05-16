import React from 'react';
//import ReactDOM from 'react-dom';
import {useEffect , useState} from 'react';
import io from 'socket.io-client';
import {Line} from 'react-chartjs-2';





const socket = io('http://localhost:5000/');
if(socket !== undefined){
    console.log("Socket connected");
}



const ChartJS = () =>{
    
    const [newData,setData]=useState([]);
    const [newData2,setData2]=useState([]);
    const [newData3,setData3]=useState([]);



    const state = {
        labels: newData2,
        datasets: [
          {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: newData
          },
          {
            label: 'Flood',
            fill: false,
            lineTension: 0.4,
            backgroundColor: 'rgba(75,192,192,1)',
            
            borderColor: 'rgba(255,0,0,1)',
            borderWidth: 2,
            data: newData3
          }
        ]
        }   


      useEffect(()=>{
        socket.on('output',(res) =>{
            const data1 = res[0].Open
            console.log(res[0]);
            setData(currData => [...currData,data1]);
            const data2 = res[0].Time
              setData2(currData => [...currData,data2]);
              const data3 = res[0].High
              setData3(currData => [...currData,data3]);  
            }); 
       },[]);
 
    // console.log(newData);
    // console.log(newData2);
    
    
    return( 
        
        <div>
           <h1> Real Time Charts </h1>
           
           

                        <Line
                                  data={state}
                                  options={{
                                    title:{
                                      display:true,
                                      text:'Stocks',
                                      fontSize:20
                                    },
                                    legend:{
                                      display:true,
                                      position:'right'
                                    }
                                  }}
                                />


        </div>


    );
};




export default ChartJS;
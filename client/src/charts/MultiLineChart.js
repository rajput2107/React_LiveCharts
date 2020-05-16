import React from 'react';
//import ReactDOM from 'react-dom';
import {useEffect , useState} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import io from 'socket.io-client';




const socket = io('http://localhost:5000/');
if(socket !== undefined){
    console.log("Socket connected");
}



const ReChart = () =>{

    

    
    
    const [newData,setData]=useState([]);

    let status = false;
    const onClick = e => status = !status; 

    let final = true;
    const onClick2 = e => final = false;

     useEffect(()=>{
        
        socket.on('output',(res) =>{
            const data1 = res[0]
            if(status == true){
            setData(currData => [...currData,data1]);
            }
            if(final==false){
                socket.disconnect();
               }
            });
            
           

      
       },[]);
     
 
    //console.log(newData);

        
    
    
    return( 
        
        <div>
           <h1> Real Time Charts </h1>

           
           <input type="submit"  onClick={e => onClick(e)}/>
           <input type="submit"  name="Disconnect" onClick={e => onClick2(e)}/>
           
            <LineChart width={600} height={300} data={newData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="Open" stroke="#8884d8" />
                <Line type="monotone" dataKey="High" stroke="#8324d8" />
                <Line type="monotone" dataKey="Low" stroke="#8897d8" />
                <Line type="monotone" dataKey="Close" stroke="#8884d4" />
            
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="Time" />
                <YAxis />
                <Tooltip />
            </LineChart>

        </div>


    );
};




export default ReChart;
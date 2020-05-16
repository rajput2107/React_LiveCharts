import React, { Fragment } from 'react';
import './App.css';
import ReChart from './charts/reChart';
import ChartJS from './charts/chartJS';
import CandleStick from './charts/CandleStick'
//import HeikinAshi from './charts/HeikinAshi';
import Renko from './charts/Renko';
import MultiLineChart from './charts/MultiLineChart';
import Stock from './charts/Stock';


function App() {
  return (
    <Fragment>
      {/* <HeikinAshi /> */}
      {/* <Renko /> */}
      
      {/* <CandleStick /> */}
      {/* <MultiLineChart />
      <MultiLineChart /> */}
      {/* <ReChart />*/}
       {/* <ChartJS />  */}
       <Stock />
    </Fragment>
  );
}

export default App;

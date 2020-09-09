const express = require('express');
const http = require('http');
const socket = require('socket.io');
const connectDB = require('./config/db');
const User = require('./model/User');
const RealTime = require('./model/RealTime');
const Multi = require('./model/Multi');

const app = express();
// Connect Database
connectDB();




app.use(express.json({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



app.use('/users',require('./routes/users'));  

  const port = process.env.PORT || 5000;

  const server = app.listen(port, () => console.log(`Listening on port ${port}`));

  const io = socket(server);

  let x=15387912000;
  io.sockets.on('connection',(socket) => {
    console.log(`Socket Connection Established:  ${socket.id}`);


      //getData(socket);
      
      setInterval(()=>{
        
        RealTime.create({Time:x=x+2000,Open:Math.floor(Math.random()*700),High:Math.floor(Math.random()*600),Low:Math.floor(Math.random()*200)
          ,Close:Math.floor(Math.random()*1000)} ,(err,data)=>{});
        
        RealTime.find({}).sort({_id:-1}).limit(1).exec((err,data)=>{
          //console.log(data[0]);
          socket.emit('output',data);
        })

        Multi.create({Subplot:Math.floor(Math.random()*2),Open:Math.floor(Math.random()*700),High:Math.floor(Math.random()*600),Low:Math.floor(Math.random()*200)
          ,Close:Math.floor(Math.random()*1000)} ,(err,data)=>{});
        
        Multi.find({}).sort({_id:-1}).limit(1).exec((err,data)=>{
          //console.log(data[0].Subplot);
          if(data[0].Subplot === 0){
            socket.emit('Subplot1',data);
          }
          else{
            socket.emit('Subplot2',data);
          }
        })

        fs = require('fs')
        fs.readFile('ADRatio.txt', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        else{
          socket.emit('Live',data);
          var x = new Date();
          let minutes = x.getMinutes();
          let Seconds = x.getSeconds();
          let curr_time  = (minutes +":"+ Seconds)
          socket.emit('Live_Time',curr_time);
          console.log(curr_time);
        }
        
        console.log(data);
});


      },2000);

  });

 


  // async function getData(socket){
  //           try {
  //             const data = await User.find({});
  //             console.log(data);
  //             socket.emit('output',data);
  //         } catch (err) {
  //             console.error(err.message);
  //             res.status(500).send('Server Error');
  //         }

  //         setInterval(()=>{
  //                 getData(socket);
  //               },1000);
  // }

 



  //  io.sockets.on('connection',(socket) => {
  //   console.log(`Socket Connection Established:  ${socket.id}`);
  //   sendData(socket);
  // });

  // function sendData(socket){
    

  //     x=x+5;
  //     y=y+2;
  //     socket.emit('output',{
  //     name:'Logs',
  //     uv: x ,
  //     pv: y
      
  //   });

      
  //   console.log(`Data is ${x}`);

  //   setTimeout(()=>{
  //     sendData(socket);
  //   },1000);
  // }











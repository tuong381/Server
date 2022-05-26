

var express = require("express");
var app =express();
var mysql=require("mysql");
var server= require("http").Server(app);
var io =require("socket.io")(server);
server.listen(3000);



var connection=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"quanlyphonggym"
});

connection.connect({

});

// tạo kết nối giữa client và server
io.on("connection", function(socket)
{
    console.log("co nguoi vua ket noi " + socket.id);
    io.sockets.emit("id", socket.id)
    // console.log(socket);
    
// socket.adapter.room : show danh sach room dang co





    socket.on("client-sent-data", data => {
      console.log(data, socket.id);
      
      io.sockets.emit("client-sent-data", data, socket.id);

      ////////
      socket.on("client-sent-idKH", idKH => {
 
        io.sockets.emit("client-sent-idKH", idKH );
          /////client-sent-trangthai

          socket.on("client-sent-trangthai", trangthai => {
 
            io.sockets.emit("client-sent-trangthai", trangthai );
              /////
              socket.on("client-sent-idNV", idNV => {
 
                io.sockets.emit("client-sent-idNV", idNV );
              
                  // save database
                  connection.query("INSERT INTO chat (id_NhanVien,id_KhachHang,TinNhan,TrangThai ) VALUES ('" + idNV +"','" + idKH +"','" + data +"','" + trangthai +"')", function(error, result ){
              

                    // io.socket.emit("client-sent-dulieu",{
                    //   id:result.insertId,
                    //   tinnhan:data
                    // })
                   


                  });
                
                   
                });
              
              //////
               
            });
          
          //////
           
        });
      });
      ////

     
    });

    
    
		
    






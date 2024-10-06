const {createServer} = require("node:http"); 
const {CatfactsModel}  = require("./model/catfactsmodel")
const express = require("express")
require('dotenv').config();

const bodyparser = require("body-parser");
const cors = require("cors")
const {DBconnection} =  require("./dbconfig");

const httpserver = express();
// DBconnection();
httpserver.use(bodyparser.json());
httpserver.use(cors());

DBconnection();
//  httpserver.use("/" , require("./controllers/taskcontroller"))

        
        httpserver.post("/addcatfacts" , (req , res)=>{


 const newcatfact = new CatfactsModel(req.body);

try{

  if(newcatfact){
    newcatfact.save();
  
    res.send({message : "facts created !!!"})
          
  }
  else{

    res.status(500).json({message : "fact creation failed"})
          


  }
  
}
  catch(err){
console.log(`${err} error logged here`);


  }



                  });


httpserver.get("/getcatfacts", (req, res, next) => {

 
  CatfactsModel.find().then((response) => {

      if (response) {

          if (response.length > 0) {

              res.status(200).json({
                  "userregistrationdetails": response 
              })
          } else {
              res.status(200).json({
                  "response": "  not found"
              })
          }



      }
  }).catch((err) => {
      {

          res.status(500).json({
              "message": "internal server error"
          })

      }
  })




});



// starts a simple http server locally on port 3000
httpserver.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`

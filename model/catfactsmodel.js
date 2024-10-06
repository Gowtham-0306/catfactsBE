const mongoose = require("mongoose");


const catfactsSchema = mongoose.Schema({


catfacts : {type : String  , required : true  , unique : false} ,



    
},
{timestamps : true}
);











const CatfactsModel = mongoose.model("catfacts" , catfactsSchema);


module.exports = { CatfactsModel
};
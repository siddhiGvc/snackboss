const paytmRouter=require("express").Router();
const {getAmazonMessage}=require("../controllers/amazon.controllers");

paytmRouter.post("/",getAmazonMessage);


module.exports=paytmRouter;
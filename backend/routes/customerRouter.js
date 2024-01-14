const express = require("express");
const customers = require("../models/customerModel");
const router = express.Router();

router.post("/GetAllCustomer", async (req, res) => {
  let statusCustomer = req.body.statusCustomer
  await customers.find({ status : statusCustomer }).then((data) => {
      res.json({ data })
  })
});

router.post("/GetOneCustomer/:id", async (req, res) => {
    await customers.findOne({ _id : req.params.id }).then((data) => {
        res.json({ data })
    })
});

router.post("/CreateCustomer", (req, res) => {
    const { companyName, email, firstName, lastName, telephoneNumber } = req.body;
    const status = req.body.statusCustomer;
    if ( !companyName || !email || !firstName || !lastName || !telephoneNumber || !status ) {
        return res.json({ message: "All data is requied" });
    }
    customers.findOne({ email : email }).then((data) => {
        if( data ){
            return res.json({ message: "This Customer already exists" });
        }else{
            customers.create({ companyName, email, firstName, lastName, telephoneNumber, status }).then(() => {
                res.json({ message: "Create Customer success" });
            });
        }
    })
});

router.patch("/ChangeCustomerstatus/:id", async (req, res) => {
    const id = req.params.id
    let status = req.body.statusCustomer
    if(status == "active"){
        status = "inactive"
    }else{
        status = "active"
    }
    await customers.findByIdAndUpdate(id, { status }).then(() => {
        res.json({ message: "Change customer status success" })
    })
});

router.patch("/UpdateCustomer/:id", (req, res) => {
    const id = req.params.id;
    const { companyName, email, firstName, lastName, telephoneNumber } = req.body;
    if ( !companyName || !email || !firstName || !lastName || !telephoneNumber ) {
        return res.json({ message: "All data is requied" });
    }
    customers.findOne({ _id : id }).then((data)=>{
    if ( 
        data.companyName == companyName && 
        data.email == email && 
        data.firstName == firstName &&
        data.lastName == lastName &&
        data.telephoneNumber == telephoneNumber
    ) {
        customers.findByIdAndUpdate(id, { companyName, email, firstName, lastName, telephoneNumber }).then(() => {
          return res.json({ message: "Update customer success" });
        });
    }else{
        customers.findOne({ email : email }).then((newData)=>{
        if( newData ){
          return res.json({ message: "This customer email already exists" });
        }else{
            customers.findByIdAndUpdate(id, { companyName, email, firstName, lastName, telephoneNumber }).then(() => {
            return res.json({ message: "Update customer success" });
          });
        }
      })
    }
  })
});

router.delete("/DeleteCustomer/:id", async (req, res) => {
    const id = req.params.id
    // await users.find({ jobPosition : id }).then((data)=>{
    //   if(data.length == 0){
        customers.findByIdAndDelete({ _id : id }).then(() => {
          return res.json({ message:"Deleted customer success"})
        })
    //   }else{
    //     return res.json({ message:"This customer have data in project"})
    //   }
    // })
  });

module.exports = router;
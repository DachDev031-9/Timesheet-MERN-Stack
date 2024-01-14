const express = require("express");
const jobPositions = require("../models/jobPositionModel");
const users = require("../models/userModel")
const router = express.Router();

router.get("/GetAllJobposition", async (req, res) => {
  await jobPositions.find({ status : "active" }).then((data) => {
      res.json({ data })
  })
});

router.post("/GetOneJobposition/:id", async (req, res) => {
  await jobPositions.findOne({ _id : req.params.id }).then((data) => {
      res.json({ data })
  })
});

router.post("/GetAllJobposition", async (req, res) => {
    let statusJobposition = req.body.statusJobposition
    await jobPositions.find({ status : statusJobposition }).then((data) => {
        res.json({ data })
    })
});

router.post("/CreateJobposition", (req, res) => {
    const jobPosition = req.body.job;
    const status = req.body.statusJobposition;
    if ( !jobPosition ) {
        return res.json({ message: "All data is requied" });
    }
    jobPositions.findOne({ jobPosition }).then((data) => {
        if( data ){
            return res.json({ message: "This jobPosition already exists" });
        }else{
            jobPositions.create({ jobPosition, status }).then(() => {
                res.json({ message: "Create jobposition success" });
            });
        }
    })
});

router.patch("/ChangeJobpositionStatus/:id", async (req, res) => {
  const id = req.params.id
  let status = req.body.statusJobposition
  if(status == "active"){
    status = "inactive"
  }else{
    status = "active"
  }
  await jobPositions.findByIdAndUpdate(id, { status }).then(() => {
    res.json({ message: "Change jobposition status success" })
  })
});

router.patch("/UpdateJobposition/:id", (req, res) => {
    const id = req.params.id;
    const jobPosition  = req.body.job;
    if ( !jobPosition ) {
      return res.json({ message: "All data is requied" });
    }
    jobPositions.findOne({ _id : id }).then((data)=>{
    if ( data.jobPosition == jobPosition ) {
        jobPositions.findByIdAndUpdate(id, { jobPosition }).then(() => {
          return res.json({ message: "Update jobposition success" });
        });
    }else{
        jobPositions.findOne({ jobPosition : jobPosition }).then((newData)=>{
        if( newData ){
          return res.json({ message: "This jobposition already exists" });
        }else{
          jobPositions.findByIdAndUpdate(id, { jobPosition }).then((data) => {
            return res.json({ message: "Update jobposition success" });
          });
        }
      })
    }
  })
});

router.delete("/DeleteJobposition/:id", async (req, res) => {
  const id = req.params.id
  await users.find({ jobPosition : id }).then((data)=>{
    if(data.length == 0){
      jobPositions.findByIdAndDelete({ _id : id }).then(() => {
        return res.json({ message:"Deleted jobposition success"})
      })
    }else{
      return res.json({ message:"This job position have Employees"})
    }
  })
});

module.exports = router;
const express = require("express");
const users = require("../models/userModel");
const router = express.Router();

router.post("/GetAllUser", async (req, res) => {
  const status = req.body.statusUser
    await users.aggregate([
      {
        $match: {
          "status": status,
        },
      },
      {
        $lookup: {
          from: "jobpositions",
          localField: "jobPosition",
          foreignField: "_id",
          as: "jobPositionDetails",
        },
      },
      {
        $project: {
          "jobPosition": 0,
        }
      },
    ]).then(( data ) => {
      res.json( data );
    })
});

router.post("/GetAllUserOfDepartment", async (req, res) => {
  const status = req.body.statusUser
  const jobType = req.body.selectTypeJob
  await users.aggregate([
    {
      $lookup: {
        from: "jobpositions",
        localField: "jobPosition",
        foreignField: "_id",
        as: "jobPositionDetails",
      },
    },
    {
      $project: {
        "jobPosition": 0,
      }
    },
    {
      $match: {
        "status": status,
        "jobPositionDetails.jobPosition": jobType,
      },
    },
  ]).then(( data ) => {
    res.json( data );
  })
});

router.delete("/DeleteUser/:id", async (req, res) => {
  await users.findByIdAndDelete({ _id : req.params.id }).then(() => {
    res.json({ message:"Delete User Success" })
  })
});

router.post("/GetOneUser/:id", async (req,res) => {
  await users.findOne({ _id : req.params.id }).then((data) => {
    res.json({ data })
  })
})

router.patch("/ChangStatusUser/:id", async (req, res) => {
  const id = req.params.id
  let status = req.body.statusUser
  if(status == "active"){
    status = "inactive"
  }else{
    status = "active"
  }
  await users.findByIdAndUpdate( id, { status } ).then(()=>{
    res.json({ message: "Change user status success"})
  })
});

router.patch("/UpdateUser/:id", (req, res) => {
  const id = req.params.id;
  const newEmail = req.body.email
  const { email, password, confirmPassword, firstName, lastName, address, jobPosition, telephoneNumber, role, status, startDate, endDate } = req.body;
  if (!email || !password || !confirmPassword || !firstName || !lastName || !address || !jobPosition || !telephoneNumber || !role || !status || !startDate) {
    return res.json({ message: "All data is requied" });
  }
  if(password != confirmPassword){
    return res.json({ message: "Password no match" });
  }
  users.findOne({ _id : id }).then((data)=>{
    if ( data.email == newEmail ) {
      users.findByIdAndUpdate(id, { email,password,firstName,lastName,address,jobPosition,telephoneNumber,role,status,startDate,endDate }).then(() => {
        return res.json({ message: "Update user data success" });
      });
    }else{
      users.findOne({ email : newEmail }).then((newData)=>{
        if( newData ){
          return res.json({ message: "This email already exists" });
        }else{
          users.findByIdAndUpdate(id, { email,password,firstName,lastName,address,jobPosition,telephoneNumber,role,status,startDate,endDate }).then(() => {
            return res.json({ message: "Update user data success" });
          });
        }
      })
    }
  })
});

module.exports = router;

const express = require("express");
// const customers = require("../models/customerModel")
// const users = require("../models/userModel")
const projects = require("../models/projectModel")
const router = express.Router();

router.post("/GetAllProject", async (req, res) => {
    let statusProject = req.body.statusProject
    await projects.aggregate([
        {
            $match: {
            "status": statusProject,
            },
        },
        {
            $lookup: {
            from: "customers",
            localField: "customerName",
            foreignField: "_id",
            as: "customerDetails",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "mainResponsible",
                foreignField: "_id",
                as: "getMainResponsible"
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "responsibleTeam",
                foreignField: "_id",
                as: "teamDetails"
            },
        },
        {
            $project: {
            "customerName": 0,
            "mainResponsible": 0,
            "responsibleTeam": 0
            }
        },
    ]).then(( data ) => {
        res.json( data );
    })
});

// router.post("/GetOneProject/:id", async (req, res) => {
//     await projects.aggregate([
//         {
//             $match: {
//             "_id": req.params.id,
//             },
//         },
//         {
//             $lookup: {
//             from: "customers",
//             localField: "customerName",
//             foreignField: "_id",
//             as: "customerDetails",
//             },
//         },
//         {
//             $lookup: {
//                 from: "users",
//                 localField: "responsibleTeam",
//                 foreignField: "_id",
//                 as: "teamDetails"
//             },
//         },
//         {
//             $project: {
//             "customerName": 0,
//             "responsibleTeam": 0
//             }
//         },
//     ]).then(( data ) => {
//         res.json( data );
//     })
// });

router.post("/CreateProject", (req, res) => {
    const { projectName, customerName, mainResponsible, responsibleTeam, startDate, endDate } = req.body;
    const status = req.body.statusProject;
    if ( !projectName || !customerName || !mainResponsible || !responsibleTeam || !startDate || !status ) {
        return res.json({ message: "All data is requied" });
    }
    projects.findOne({ projectName : projectName, customerName : customerName }).then((data) => {
        if( data ){
            return res.json({ message: "This Project already exists" });
        }else{
            projects.create({ projectName, customerName, mainResponsible, responsibleTeam, startDate, endDate, status }).then(() => {
                res.json({ message: "Create Project success" });
            });
        }
    })
});

module.exports = router;
import React, { useEffect, useState } from 'react'
import Wrapper from '../css/Alluser'
import { Link } from 'react-router-dom'
import axios from "axios"

function Alluser() {
  const [ users, setUsers ] = useState([])
  const [ jobPositions, setJobPosition ] = useState([])
  let [ statusUser, setStatusUser ] = useState("active")

  const [ colorTypejob , setColorTypejob ] = useState("")
  let [ selectTypeJob, setSelectTypejob] = useState("all")

  let [ dataID, setDataID] = useState("")
  let [ warningMessage, setWarningMessage ] = useState("")
  let [ modalWarning, setModalWarning ] = useState(false)
  let [ modalManageStatus, setModalManageStatus ] = useState(false)
  let [ modalConfirmDelete , setModalConfirmDelete ] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const usersDataPerPage = 12;

  const indexOfLastUser = currentPage * usersDataPerPage;
  const indexOfFirstUser = indexOfLastUser - usersDataPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const fetchData = async () => {
    await axios.post(`http://localhost:8080/GetAllUser`, { statusUser }).then((response) => {
      setUsers(response.data)
      setCurrentPage(1)
    })
    await axios.get(`http://localhost:8080/GetAllJobposition`).then((response) => {
      setJobPosition(response.data.data)
    })
  }

  useEffect(() => {
    fetchData()
  },[])

  const handleSelectTypeJobID = async (id,jobType) => {
    setColorTypejob(id)
    setSelectTypejob(selectTypeJob = jobType)
    if(selectTypeJob != "all"){
      await axios.post(`http://localhost:8080/GetAllUserOfDepartment`,{ statusUser, selectTypeJob }).then((response) => {
        setUsers(response.data)
        setCurrentPage(1)
      })
    }else{
      fetchData()
    }
  }
  
  const handleStatus = async () => {
    if(statusUser == "active"){
      setStatusUser(statusUser = "inactive")
    }else{
      setStatusUser(statusUser = "active")
    }
    if(selectTypeJob != "all"){
      await axios.post(`http://localhost:8080/GetAllUserOfDepartment`,{ statusUser, selectTypeJob }).then((response) => {
        setUsers(response.data)
        setCurrentPage(1)
      })
    }else{
      fetchData()
    }
  }

  const handleManageData = async (id) => {
    setDataID(id)
    setModalManageStatus(true)
  }

  const handleSetStatus = async () => {
    await axios.patch(`http://localhost:8080/ChangStatusUser/${dataID}`, { statusUser }).then((response)=>{
      setWarningMessage(warningMessage = response.data.message)
      setModalWarning(true)
    })
  }

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8080/DeleteUser/${dataID}`).then((response)=>{
      setWarningMessage(warningMessage = response.data.message)
      setModalWarning(true)
    })
  }

  const handleWarning = async () => {
    setModalWarning(false)
    setModalManageStatus(false)
    setModalConfirmDelete(false)
    if(selectTypeJob != "all"){
      await axios.post(`http://localhost:8080/GetAllUserOfDepartment`,{ statusUser, selectTypeJob }).then((response) => {
        setUsers(response.data)
        setCurrentPage(1)
      })
    }else{
      fetchData()
    }
  }

  const handlePageChange = (type) => {
    if (type === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (type === 'first' && currentPage > 1) {
      setCurrentPage(1);
    } else if (type === 'next' && indexOfLastUser < users.length) {
      setCurrentPage(currentPage + 1);
    } else if (type === 'last' && indexOfLastUser < users.length) {
      setCurrentPage(Math.ceil(users.length/usersDataPerPage));
    }
  };
    
  return (
    <Wrapper>
      <div className="container-btn-menubar">
        <div className="btn-group-jobposition">
          <button 
            type="button" 
            onClick={() => handleSelectTypeJobID("","all")} 
            className={colorTypejob == "" ? "btn-group-jobposition-active" : ""}>
              All
          </button>
          {jobPositions.map((jobPosition) => (
            <button 
              type="button" 
              key={jobPosition._id} 
              onClick={() => handleSelectTypeJobID(jobPosition._id,jobPosition.jobPosition)} 
              className={colorTypejob == jobPosition._id ? "btn-group-jobposition-active" : ""}>
                {jobPosition.jobPosition}
            </button>
          ))}
        </div>
        <button 
          type="button" 
          className={statusUser == "active" ? "btn-active" : "btn-active btn-inactive"} 
          onClick={()=> handleStatus()}>
            {statusUser == "active" ? "Active" : "InActive"}
        </button>
        <Link to="/adduser" className='btn-create-user'>Create User</Link>
      </div>

      <div className="container">
        {currentUsers.map((user) => (
          <div className="userContainer" key={user._id}>
            <h1>{user.firstName + " " + user.lastName}</h1>
            <p>Job Position : {user.jobPositionDetails[0].jobPosition}</p>
            <p>Email : {user.email}</p>
            <p>Telephone : {user.telephoneNumber}</p>
            <div className='btn-group'>
            <Link to={`/edituser/${user._id}`} className='btn-manage-user btn-edit'>Edit</Link>
            <button type="button" className='btn-manage-user btn-manage-status' onClick={() => handleManageData(user._id)}>Manage Status</button>
            </div>
          </div>
        ))}
      </div>

      <div className='current-page'>
        <button onClick={() => handlePageChange('first')} disabled={currentPage === 1} className={currentPage !== 1 ? `active` : ``}>First</button>
        <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1} className={currentPage !== 1 ? `active` : ``}>Back</button>
        <span> Page {currentPage} </span>
        <button onClick={() => handlePageChange('next')} disabled={indexOfLastUser >= users.length} className={indexOfLastUser < users.length ? `active` : ``}>Next</button>
        <button onClick={() => handlePageChange('last')} disabled={indexOfLastUser >= users.length} className={indexOfLastUser < users.length ? `active` : ``}>Last</button>
      </div>

      <section className={modalManageStatus ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>Please select user status</h1>
            <button type="submit" className='btn-in-manage-status submit-btn' onClick={() => handleSetStatus()}>Set Active / InActive</button>
            <button type="button" className='btn-in-manage-status delete-btn' onClick={() => setModalConfirmDelete(true)}>Delete</button>
            <button type="button" className='btn-in-manage-status close-btn' onClick={() => setModalManageStatus(false)}>Close</button>
        </div>
      </section>

      <section className={modalConfirmDelete ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>Do you want to Delete ?</h1>
          <form>
            <button type="button" className='btn-in-manage-status delete-btn' onClick={() => handleDelete()}>YES</button>
            <button type="button" className='btn-in-manage-status close-btn' onClick={() => setModalConfirmDelete(false)}>NO</button>
          </form>
        </div>
      </section>

      <section className={modalWarning ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>{warningMessage}</h1>
          <form>
            <button type="button" className='btn-in-manage-status submit-btn' onClick={() => handleWarning()}>OK</button>
          </form>
        </div>
      </section>
    </Wrapper>
  )
}

export default Alluser
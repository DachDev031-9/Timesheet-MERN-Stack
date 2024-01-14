import React, { useEffect, useState } from 'react'
import Wrapper from '../css/AllJobposition'
import axios from "axios"

function AllJobposition() {
  const [ jobPositions, setJobPosition ] = useState([])
  let [ statusJobposition, setStatusJobposition ] = useState("active")
  
  const [currentPage, setCurrentPage] = useState(1);
  const jobPositionsDataPerPage = 16;
  const indexOfLastjobPosition = currentPage * jobPositionsDataPerPage;
  const indexOfFirstjobPosition = indexOfLastjobPosition - jobPositionsDataPerPage;
  const currentjobPositions = jobPositions.slice(indexOfFirstjobPosition, indexOfLastjobPosition);
  
  let [ warning, setWarning ] = useState("")
  let [ modalCreate, setModalCreate ] = useState(false)
  let [ modalEdit, setModalEdit ] = useState(false)
  let [ modalManageStatus, setModalManageStatus ] = useState(false)
  let [ modalConfirmDelete, setModalConfirmDelete ] = useState(false)
  let [ modalWarning, setModalWarning ] = useState(false)
  let [ warningMessage, setWarningMessage ] = useState("")
  let [ dataID, setDataID] = useState("")

  const [ job, setJob ] = useState("")

  const fetchData = async () => {
    await axios.post(`http://localhost:8080/GetAllJobposition`, { statusJobposition } ).then((response) => {
      setJobPosition(response.data.data)
    })
  }
  useEffect(() => {
    fetchData()
  },[])
  
  const handleStatus = () => {
    if(statusJobposition == "active"){
      setStatusJobposition(statusJobposition = "inactive")
    }else{
      setStatusJobposition(statusJobposition = "active")
    }
    fetchData()
  }

  const handlePageChange = (type) => {
    if (type === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (type === 'first' && currentPage > 1) {
      setCurrentPage(1);
    } else if (type === 'next' && indexOfLastjobPosition < jobPositions.length) {
      setCurrentPage(currentPage + 1);
    } else if (type === 'last' && indexOfLastjobPosition < jobPositions.length) {
      setCurrentPage(Math.ceil(jobPositions.length/jobPositionsDataPerPage));
    }
  };

  const handleManageData = async (id,request) => {
    if(!id && request == "create"){
      setWarning(warning = "Create new Jobposition")
      setJob("")
      setModalCreate(true)
    }else if(id && request == "edit"){
      setDataID(id)
      await axios.post(`http://localhost:8080/GetOneJobposition/${id}`).then((response) => {
        setJob(response.data.data.jobPosition)
      })
      setWarning(warning = "Edit Jobposition")
      setModalEdit(true)
    }else if(id && request == "manageStatus"){
      setDataID(id)
      setWarning(warning = "Please select jobposition status")
      setModalManageStatus(true)
    }
  }

  const handleConfirm = async ( event ) => {
    event.preventDefault()
    if(modalCreate){
      await axios.post(`http://localhost:8080/CreateJobposition`, { job, statusJobposition }).then((response) => {
        setWarningMessage(response.data.message)
        setModalWarning(true)
        if(response.data.message == "This jobPosition already exists"){
          setModalCreate(true)
        }else{
          setModalCreate(false)
        }
      })
    }else if(modalEdit){
      await axios.patch(`http://localhost:8080/UpdateJobposition/${dataID}`, { job }).then((response)=>{
        if(response.data.message == "Update jobposition success"){
          setWarningMessage(response.data.message)
          setModalWarning(true)
          setModalEdit(false)
          fetchData()
        }else if(response.data.message == "This jobposition already exists"){
          setWarningMessage(response.data.message)
          setModalWarning(true)
          fetchData()
        }
      })
    }else if(modalManageStatus){
      await axios.patch(`http://localhost:8080/ChangeJobpositionStatus/${dataID}`, { statusJobposition }).then((response)=>{
        setWarningMessage(response.data.message)
        setModalWarning(true)
        setModalManageStatus(false)
        fetchData()
      })
    }
  }

  const handleDeleteJobposition = async () => {
    await axios.delete(`http://localhost:8080/DeleteJobposition/${dataID}`).then((response) => {
      if(response.data.message == "This job position have Employees"){
        setWarningMessage(response.data.message)
        setModalWarning(true)
      }else if(response.data.message == "Deleted jobposition success"){
        setWarningMessage(response.data.message)
        setModalWarning(true)
        setModalConfirmDelete(false)
        setModalManageStatus(false)
        fetchData()
      }
    })
  }

  const handleWarning = () => {
    setModalWarning(false)
    setModalConfirmDelete(false)
    fetchData()
  }

  return (
    <Wrapper>
      <div className="container-menubar">
        <button 
          type="button" 
          className={statusJobposition == "active" ? "btn-active" : "btn-active btn-inactive"} 
          onClick={()=> handleStatus()}>
            {statusJobposition == "active" ? "Active" : "InActive"}
        </button>
        <button 
          type="button" 
          className='btn-create-jobposition' 
          onClick={() => handleManageData(null,"create")}>
            Create Jobposition
        </button>
      </div>
      <div className="container-content">
        {currentjobPositions.map((jobPosition) => (
          <div className="Container-jobposition" key={jobPosition._id}>
            <h1>{jobPosition.jobPosition}</h1>
            <div className='container-btn-group'>
              <button type="button" className='btn-edit' onClick={() => handleManageData(jobPosition._id,"edit")}>Edit</button>
              <button type="button" className='btn-setstatus' onClick={() => handleManageData(jobPosition._id,"manageStatus")}>Manage Status</button>
            </div>
          </div>
        ))}
      </div>

      <div className='container-current-page'>
        <button 
          onClick={() => handlePageChange('first')} 
          disabled={currentPage === 1} 
          className={currentPage !== 1 ? `current-page-btn-active` : ``}>
            First
        </button>
        <button 
          onClick={() => handlePageChange('prev')} 
          disabled={currentPage === 1} 
          className={currentPage !== 1 ? `current-page-btn-active` : ``}>
            Back
        </button>
        <span> Page {currentPage} </span>
        <button 
          onClick={() => handlePageChange('next')} 
          disabled={indexOfLastjobPosition >= jobPositions.length} 
          className={indexOfLastjobPosition < jobPositions.length ? `current-page-btn-active` : ``}>
            Next
        </button>
        <button 
          onClick={() => handlePageChange('last')} 
          disabled={indexOfLastjobPosition >= jobPositions.length} 
          className={indexOfLastjobPosition < jobPositions.length ? `current-page-btn-active` : ``}>
            Last
        </button>
      </div>
      
      <section className={modalCreate ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>{warning}</h1>
          <form onSubmit={handleConfirm}>
            <div className='form-group'>
              <label htmlFor="">Jobposition Nmae</label>
              <input type="text" value={job} onChange={(event) => setJob(event.target.value)} required />
            </div>
            <button type="submit" className='submit-btn'>Submit</button>
            <button type="button" className='close-btn' onClick={() => setModalCreate(false)}>Close</button>
          </form>
        </div>
      </section>

      <section className={modalEdit ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>{warning}</h1>
          <form onSubmit={handleConfirm}>
            <div className='form-group'>
              <label htmlFor="">Jobposition Nmae</label>
              <input type="text" value={job} onChange={(event) => setJob(event.target.value)} required />
            </div>
            <button type="submit" className='submit-btn'>Submit</button>
            <button type="button" className='close-btn' onClick={() => setModalEdit(false)}>Close</button>
          </form>
        </div>
      </section>

      <section className={modalManageStatus ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>{warning}</h1>
          <form onSubmit={handleConfirm}>
            <button type="submit" className='submit-btn'>Set Active / InActive</button>
            <button type="button" className='delete-btn' onClick={() => setModalConfirmDelete(true)}>Delete</button>
            <button type="button" className='close-btn' onClick={() => setModalManageStatus(false)}>Close</button>
          </form>
        </div>
      </section>

      <section className={modalConfirmDelete ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>Do you want to Delete ?</h1>
          <form>
            <button type="button" className='delete-btn' onClick={() => handleDeleteJobposition()}>Yes</button>
            <button type="button" className='close-btn' onClick={() => setModalConfirmDelete(false)}>No</button>
          </form>
        </div>
      </section>

      <section className={modalWarning ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>{warningMessage}</h1>
          <form>
            <button 
            type="button" 
            className={warningMessage.includes("success") ?"submit-btn" : "delete-btn"} 
            onClick={() => handleWarning()}>OK</button>
          </form>
        </div>
      </section>
    </Wrapper>
  )
}

export default AllJobposition
import React, { useEffect, useState } from 'react'
import Wrapper from '../css/Allproject'
import axios from "axios"

function Allproject() {

  let [ list, setList ] = useState([])
  let [ listEmployeeCompare, setListEmployeeCompare ] = useState([])

  const [ projects, setProjects ] = useState([])
  const [ customers, setCustomers ] = useState([])
  const [ employees, setEmployees ] = useState([])
  let [ statusProject, setStatusProject ] = useState("active")

  const [ projectName, setProjectName ] = useState("")
  const [ customerName, setCustomerName ] = useState("")
  const [ responsibleTeam, setResponsibleTeam ] = useState("")
  const [ startDate, setStartDate ] = useState("")
  const [ endDate, setEndDate ] = useState("")

  const [currentPage, setCurrentPage] = useState(1);
  const projectsDataPerPage = 8;
  const indexOfLastProject = currentPage * projectsDataPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsDataPerPage;
  const currentprojects = projects.slice(indexOfFirstProject, indexOfLastProject);
  
  let [ warning, setWarning ] = useState("")
  let [ modalCreate, setModalCreate ] = useState(false)
  let [ modalCustomerList, setModalCustomerList ] = useState(false)
  let [ modalEmployssList, setModalEmployssList ] = useState(false)
  // let [ modalEdit, setModalEdit ] = useState(false)
  let [ modalManageStatus, setModalManageStatus ] = useState(false)
  // let [ modalConfirmDelete, setModalConfirmDelete ] = useState(false)
  let [ modalWarning, setModalWarning ] = useState(false)
  let [ warningMessage, setWarningMessage ] = useState("")
  // let [ dataID, setDataID] = useState("")

  const [ Arr_responsibleTeam, setArr_ResponsibleTeam ] = useState([])

  const fetchData = async () => {
    await axios.post(`http://localhost:8080/GetAllProject`, { statusProject } ).then((response) => {
      setProjects(response.data)
    })
  }
  useEffect(() => {
    fetchData()
  },[])
  
  const handleStatus = () => {
    if(statusProject == "active"){
      setStatusProject(statusProject = "inactive")
    }else{
      setStatusProject(statusProject = "active")
    }
    fetchData()
  }

  const handlePageChange = (type) => {
    if (type === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (type === 'first' && currentPage > 1) {
      setCurrentPage(1);
    } else if (type === 'next' && indexOfLastProject < projects.length) {
      setCurrentPage(currentPage + 1);
    } else if (type === 'last' && indexOfLastProject < projects.length) {
      setCurrentPage(Math.ceil(projects.length/projectsDataPerPage));
    }
  };

  const handleReset = () => {
    setProjectName("")
    setCustomerName("")
    setResponsibleTeam("")
    setStartDate("")
    setEndDate("")
  }

  const handleManageData = async (id,request) => {
    if(!id && request == "create"){
      setWarning(warning = "Create new Project")
      handleReset()
      setModalCreate(true)
    }else if(id && request == "edit"){
      // setDataID(id)
      // await axios.post(`http://localhost:8080/GetOneCustomer/${id}`).then((response) => {
      //   setCompanyName(response.data.data.companyName)
      //   setEmail(response.data.data.email)
      //   setFirstName(response.data.data.firstName)
      //   setLastName(response.data.data.lastName)
      //   setTelephoneNumber(response.data.data.telephoneNumber)
      // })
      // setWarning(warning = "Edit Jobposition")
      // setModalEdit(true)
    }else if(id && request == "manageStatus"){
      // setDataID(id)
      // setWarning(warning = "Please select customer status")
      // setModalManageStatus(true)
    }
  }

  const showCustomerList = (status) => {
    const statusCustomer = status
    axios.post(`http://localhost:8080/GetAllCustomer`, {statusCustomer}).then((response) => {
      setCustomers(response.data.data)
      setModalCustomerList(true)
    })
  }

  const showEmployeeList = (status) => {
    const statusUser = status
    axios.post(`http://localhost:8080/GetAllUser`, {statusUser}).then((response) => {
      setEmployees(response.data)
      for( let i = 0; i < response.data.length; i++ ){
        // setListEmployeeCompare(listEmployeeCompare.push(false))
        setListEmployeeCompare(oldData => [...oldData, false])
        console.log(listEmployeeCompare);
      }
      setModalEmployssList(true)
    })
  }

  // const handleTest = (NewemployeeList) => {
  //   // setList(List.push(employeeList))
  //   setList(List.push(NewemployeeList))
  //   console.log(List);
  // }

  const handleClose = () => {
    // console.log(list);
    console.log(listEmployeeCompare);
  }

  const handleConfirm = async ( event ) => {
    event.preventDefault()
    if(modalCreate){
      // const formData = { companyName, email, firstName, lastName, telephoneNumber, statusCustomer }
      // await axios.post(`http://localhost:8080/CreateCustomer`, formData).then((response) => {
      //   setWarningMessage(response.data.message)
      //   setModalWarning(true)
      //   if(response.data.message == "This Customer already exists"){
      //     setModalCreate(true)
      //   }else{
      //     setModalCreate(false)
      //   }
      // })
    }else if(modalEdit){
      // const formData = { companyName, email, firstName, lastName, telephoneNumber }
      // await axios.patch(`http://localhost:8080/UpdateCustomer/${dataID}`, formData).then((response)=>{
      //   if(response.data.message == "Update customer success"){
      //     setWarningMessage(response.data.message)
      //     setModalWarning(true)
      //     setModalEdit(false)
      //     fetchData()
      //   }else if(response.data.message == "This customer email already exists"){
      //     setWarningMessage(response.data.message)
      //     setModalWarning(true)
      //     fetchData()
      //   }
      // })
    }else if(modalManageStatus){
      // await axios.patch(`http://localhost:8080/ChangeCustomerstatus/${dataID}`, { statusCustomer }).then((response)=>{
      //   setWarningMessage(response.data.message)
      //   setModalWarning(true)
      //   setModalManageStatus(false)
      //   fetchData()
      // })
    }
  }

  // const handleDeleteJobposition = async () => {
  //   await axios.delete(`http://localhost:8080/DeleteCustomer/${dataID}`).then((response) => {
  //     if(response.data.message == "This customer have data in project"){
  //       setWarningMessage(response.data.message)
  //       setModalWarning(true)
  //     }else if(response.data.message == "Deleted customer success"){
  //       setWarningMessage(response.data.message)
  //       setModalWarning(true)
  //       setModalConfirmDelete(false)
  //       setModalManageStatus(false)
  //       fetchData()
  //     }
  //   })
  // }

  // const handleWarning = () => {
  //   setModalWarning(false)
  //   setModalConfirmDelete(false)
  //   fetchData()
  // }

  return (
    <Wrapper>
      <div className="container-menubar">
        <button 
          type="button" 
          className={statusProject == "active" ? "btn-active" : "btn-active btn-inactive"} 
          onClick={()=> handleStatus()}>
            {statusProject == "active" ? "Active" : "InActive"}
        </button>
        <button 
          type="button" 
          className='btn-create-jobposition' 
          onClick={() => handleManageData(null,"create")}>
            Create Project
        </button>
      </div>
      <div className="container-content">
        {currentprojects.map((project) => (
          <div className="Container-jobposition" key={project._id}>
            <h1>{project.projectName}</h1>
            <p>Company : {project.customerDetails[0].companyName}</p>
            <p>Name : {project.customerDetails[0].firstName + " " + project.customerDetails[0].lastName}</p>
            <p>Email : {project.customerDetails[0].email}</p>
            <p>Telephone : {project.customerDetails[0].telephoneNumber}</p>
            <br />
            <p>Responsible : {project.getMainResponsible[0].firstName + " " + project.getMainResponsible[0].lastName}</p>
            <div className='container-btn-group'>
              <button type="button" className='btn-edit' onClick={() => handleManageData(project._id,"edit")}>Edit</button>
              <button type="button" className='btn-setstatus' onClick={() => handleManageData(project._id,"manageStatus")}>Manage Status</button>
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
          disabled={indexOfLastProject >= projects.length} 
          className={indexOfLastProject < projects.length ? `current-page-btn-active` : ``}>
            Next
        </button>
        <button 
          onClick={() => handlePageChange('last')} 
          disabled={indexOfLastProject >= projects.length} 
          className={indexOfLastProject < projects.length ? `current-page-btn-active` : ``}>
            Last
        </button>
      </div>
      
      <section className={modalCreate ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>{warning}</h1>
          <form onSubmit={handleConfirm}>
            <div className='form-group'>
              <label htmlFor="">Project Nmae</label>
              <input type="text" value={projectName} onChange={(event) => setProjectName(event.target.value)} required />
            </div>
            <div className='form-group'>
              <label htmlFor="">Customer Name</label>
              <input type="text" value={customerName} onClick={() => showCustomerList("active")} placeholder='Click to select customer' required readOnly />
            </div>
            <div className='form-group'>
              <label htmlFor="">Main Responsible</label>
              <input type="text" value={responsibleTeam} onClick={() => showEmployeeList("active")} placeholder='Click to select employee' required  readOnly />
              {/* <input type="text" value={responsibleTeam} onChange={(event) => setResponsibleTeam(event.target.value)} required /> */}
            </div>
            <div className='form-group'>
              <label htmlFor="">Responsible Team</label>
              <input type="text" value={responsibleTeam} onClick={() => showEmployeeList("active")} placeholder='Click to select employee' required readOnly />
              {/* <input type="text" value={responsibleTeam} onChange={(event) => setResponsibleTeam(event.target.value)} required /> */}
            </div>
            <div className='form-group'>
              <label htmlFor="">Start Date</label>
              <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
            </div>
            <div className='form-group'>
              <label htmlFor="">End Date</label>
              <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
            </div>
            <button type="submit" className='submit-btn'>Submit</button>
            <button type="reset" className='reset-btn' onClick={() => handleReset()}>Reset</button>
            <button type="button" className='close-btn' onClick={() => setModalCreate(false)}>Close</button>
          </form>
        </div>
      </section>

      {/* <section className={modalEdit ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>{warning}</h1>
          <form onSubmit={handleConfirm}>
            <div className='form-group'>
              <label htmlFor="">Company Nmae</label>
              <input type="text" value={companyName} onChange={(event) => setCompanyName(event.target.value)} required />
            </div>
            <div className='form-group'>
              <label htmlFor="">Email</label>
              <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className='form-group'>
              <label htmlFor="">First Name</label>
              <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
            </div>
            <div className='form-group'>
              <label htmlFor="">Last Nmae</label>
              <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
            </div>
            <div className='form-group'>
              <label htmlFor="">Telephone Number</label>
              <input type="text" value={telephoneNumber} onChange={(event) => setTelephoneNumber(event.target.value)} required />
            </div>
            <button type="submit" className='submit-btn'>Submit</button>
            <button type="reset" className='reset-btn' onClick={() => handleReset()}>Reset</button>
            <button type="button" className='close-btn' onClick={() => setModalEdit(false)}>Close</button>
          </form>
        </div>
      </section> */}

      {/* <section className={modalManageStatus ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>{warning}</h1>
          <form onSubmit={handleConfirm}>
            <button type="submit" className='submit-btn'>Set Active / InActive</button>
            <button type="button" className='delete-btn' onClick={() => setModalConfirmDelete(true)}>Delete</button>
            <button type="button" className='close-btn' onClick={() => setModalManageStatus(false)}>Close</button>
          </form>
        </div>
      </section> */}

      {/* <section className={modalConfirmDelete ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>Do you want to Delete ?</h1>
          <form>
            <button type="button" className='delete-btn' onClick={() => handleDeleteJobposition()}>Yes</button>
            <button type="button" className='close-btn' onClick={() => setModalConfirmDelete(false)}>No</button>
          </form>
        </div>
      </section> */}

      {/* <section className={modalWarning ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>{warningMessage}</h1>
          <form>
            <button 
            type="button" 
            className={warningMessage.includes("success") ?"submit-btn" : "delete-btn"} 
            onClick={() => handleWarning()}>OK</button>
          </form>
        </div>
      </section> */}

      <section className={modalCustomerList ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>Customer List</h1>
          <form >
            {customers.map((customer) => (
              <p key={customer._id}>{customer.companyName}</p>
            ))}
            <br />
            <button type="button" className='submit-btn' onClick={() => handleDeleteJobposition()}>Yes</button>
            <button type="button" className='close-btn' onClick={() => setModalCustomerList(false)}>No</button>
          </form>
        </div>
      </section>

      <section className={modalEmployssList ? "modal-overlay show" : "modal-overlay"}>
        <div className="container-modal">
          <h1>Employee List</h1>
          <form >
            {employees.map((employee,index) => (
              
              // <p key={employee._id} onClick={()=>setList(oldData => [...oldData, employee._id])}>{employee.firstName + " " + employee.lastName}</p>
              // <p key={employee._id} onClick={()=>setListEmployeeCompare(!listEmployeeCompare[index])}>{employee.firstName + " " + employee.lastName}</p>
              
              <p key={employee._id}>{`${listEmployeeCompare} + ${index}`}</p>
              // <p key={employee._id} onClick={()=>console.log(index)}>{employee.firstName + " " + employee.lastName}</p>
              ))}
            <br />
            <button type="button" className='submit-btn' onClick={() => handleClose()}>Yes</button>
            <button type="button" className='close-btn' onClick={() => setModalEmployssList(false)}>No</button>
          </form>
        </div>
      </section>
    </Wrapper>
  )
}

export default Allproject
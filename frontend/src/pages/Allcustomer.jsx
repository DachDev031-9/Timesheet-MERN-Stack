import React, { useEffect, useState } from 'react'
import Wrapper from '../css/Allcustomer'
import axios from "axios"

function Allcustomer() {
  const [ Customers, setCustomer ] = useState([])
  let [ statusCustomer, setStatusCustomer ] = useState("active")

  const [ companyName, setCompanyName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ telephoneNumber, setTelephoneNumber ] = useState("")
  
  const [currentPage, setCurrentPage] = useState(1);
  const CustomersDataPerPage = 12;
  const indexOfLastCustomer = currentPage * CustomersDataPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - CustomersDataPerPage;
  const currentCustomers = Customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  
  let [ warning, setWarning ] = useState("")
  let [ modalCreate, setModalCreate ] = useState(false)
  let [ modalEdit, setModalEdit ] = useState(false)
  let [ modalManageStatus, setModalManageStatus ] = useState(false)
  let [ modalConfirmDelete, setModalConfirmDelete ] = useState(false)
  let [ modalWarning, setModalWarning ] = useState(false)
  let [ warningMessage, setWarningMessage ] = useState("")
  let [ dataID, setDataID] = useState("")

  const fetchData = async () => {
    await axios.post(`http://localhost:8080/GetAllCustomer`, { statusCustomer } ).then((response) => {
      setCustomer(response.data.data)
    })
  }
  useEffect(() => {
    fetchData()
  },[])
  
  const handleStatus = () => {
    if(statusCustomer == "active"){
      setStatusCustomer(statusCustomer = "inactive")
    }else{
      setStatusCustomer(statusCustomer = "active")
    }
    fetchData()
  }

  const handlePageChange = (type) => {
    if (type === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (type === 'first' && currentPage > 1) {
      setCurrentPage(1);
    } else if (type === 'next' && indexOfLastCustomer < Customers.length) {
      setCurrentPage(currentPage + 1);
    } else if (type === 'last' && indexOfLastCustomer < Customers.length) {
      setCurrentPage(Math.ceil(Customers.length/CustomersDataPerPage));
    }
  };

  const handleReset = () => {
    setCompanyName("")
    setEmail("")
    setFirstName("")
    setLastName("")
    setTelephoneNumber("")
  }

  const handleManageData = async (id,request) => {
    if(!id && request == "create"){
      setWarning(warning = "Create new Customer")
      handleReset()
      setModalCreate(true)
    }else if(id && request == "edit"){
      setDataID(id)
      await axios.post(`http://localhost:8080/GetOneCustomer/${id}`).then((response) => {
        setCompanyName(response.data.data.companyName)
        setEmail(response.data.data.email)
        setFirstName(response.data.data.firstName)
        setLastName(response.data.data.lastName)
        setTelephoneNumber(response.data.data.telephoneNumber)
      })
      setWarning(warning = "Edit Jobposition")
      setModalEdit(true)
    }else if(id && request == "manageStatus"){
      setDataID(id)
      setWarning(warning = "Please select customer status")
      setModalManageStatus(true)
    }
  }

  const handleConfirm = async ( event ) => {
    event.preventDefault()
    if(modalCreate){
      const formData = { companyName, email, firstName, lastName, telephoneNumber, statusCustomer }
      await axios.post(`http://localhost:8080/CreateCustomer`, formData).then((response) => {
        setWarningMessage(response.data.message)
        setModalWarning(true)
        if(response.data.message == "This Customer already exists"){
          setModalCreate(true)
        }else{
          setModalCreate(false)
        }
      })
    }else if(modalEdit){
      const formData = { companyName, email, firstName, lastName, telephoneNumber }
      await axios.patch(`http://localhost:8080/UpdateCustomer/${dataID}`, formData).then((response)=>{
        if(response.data.message == "Update customer success"){
          setWarningMessage(response.data.message)
          setModalWarning(true)
          setModalEdit(false)
          fetchData()
        }else if(response.data.message == "This customer email already exists"){
          setWarningMessage(response.data.message)
          setModalWarning(true)
          fetchData()
        }
      })
    }else if(modalManageStatus){
      await axios.patch(`http://localhost:8080/ChangeCustomerstatus/${dataID}`, { statusCustomer }).then((response)=>{
        setWarningMessage(response.data.message)
        setModalWarning(true)
        setModalManageStatus(false)
        fetchData()
      })
    }
  }

  const handleDeleteJobposition = async () => {
    await axios.delete(`http://localhost:8080/DeleteCustomer/${dataID}`).then((response) => {
      if(response.data.message == "This customer have data in project"){
        setWarningMessage(response.data.message)
        setModalWarning(true)
      }else if(response.data.message == "Deleted customer success"){
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
          className={statusCustomer == "active" ? "btn-active" : "btn-active btn-inactive"} 
          onClick={()=> handleStatus()}>
            {statusCustomer == "active" ? "Active" : "InActive"}
        </button>
        <button 
          type="button" 
          className='btn-create-customer' 
          onClick={() => handleManageData(null,"create")}>
            Create Customer
        </button>
      </div>
      <div className="container-content">
        {currentCustomers.map((Customer) => (
          <div className="container-customer" key={Customer._id}>
            <h1>{Customer.companyName}</h1>
            <p>Name : {Customer.firstName + " " + Customer.lastName}</p>
            <p>Email : {Customer.email}</p>
            <p>Telephone : {Customer.telephoneNumber}</p>
            <div className='container-btn-group'>
              <button type="button" className='btn-edit' onClick={() => handleManageData(Customer._id,"edit")}>Edit</button>
              <button type="button" className='btn-setstatus' onClick={() => handleManageData(Customer._id,"manageStatus")}>Manage Status</button>
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
          disabled={indexOfLastCustomer >= Customers.length} 
          className={indexOfLastCustomer < Customers.length ? `current-page-btn-active` : ``}>
            Next
        </button>
        <button 
          onClick={() => handlePageChange('last')} 
          disabled={indexOfLastCustomer >= Customers.length} 
          className={indexOfLastCustomer < Customers.length ? `current-page-btn-active` : ``}>
            Last
        </button>
      </div>
      
      <section className={modalCreate ? "modal-overlay show" : "modal-overlay"}>
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
            <button type="button" className='close-btn' onClick={() => setModalCreate(false)}>Close</button>
          </form>
        </div>
      </section>

      <section className={modalEdit ? "modal-overlay show" : "modal-overlay"}>
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

export default Allcustomer
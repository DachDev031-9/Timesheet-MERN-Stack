import React, { useEffect, useState } from 'react'
import Wrapper from '../css/Adduser'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

function Adduser() {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ address, setAddress ] = useState("")
  const [ jobPosition, setJobPosition ] = useState("")
  const [ telephoneNumber, setTelephoneNumber ] = useState("")
  const [ role, setRole ] = useState("user")
  const [ status, setStatus ] = useState("active")
  const [ startDate, setStartDate ] = useState("")
  const [ endDate, setEndDate ] = useState("")

  const navigate = useNavigate()

  let [ warningMessage, setWarningMessage ] = useState("")
  let [ modalWarning, setModalWarning ] = useState(false)

  const [ jobPositionDatas, setJobPositionDatas ] = useState([])

  const fetchData = async () => {
    await axios.get(`http://localhost:8080/GetAllJobposition`).then((response) => {
      setJobPositionDatas(response.data.data)
    })
  }
  useEffect(() => {
    fetchData()
  },[])

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = { 
      email, 
      password, 
      confirmPassword, 
      firstName, 
      lastName, 
      address, 
      jobPosition, 
      telephoneNumber, 
      role, 
      status, 
      startDate, 
      endDate
    }
    axios.post(`http://localhost:8080/register`, formData).then((response) => {
      setWarningMessage(warningMessage = response.data.message)
      setModalWarning(true)
    })
  }

  const handleConfirm = () => {
    if(warningMessage == "Create User success"){
      setModalWarning(false)
      navigate("/alluser")
    }else{
      setModalWarning(false)
    }
  }

  const handleReset = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setFirstName("")
    setLastName("")
    setAddress("")
    setJobPosition("")
    setTelephoneNumber("")
    setRole("user")
    setStatus("active")
    setStartDate("")
    setEndDate("")
  }

  return (
    <Wrapper>
      <h1>Create User</h1>
      <form className='adduser-form' onSubmit={handleSubmit}>
        <div className="container-box">
          <div className='form-group'>
            <label htmlFor="">Email</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
          </div>
          <div className='form-group'>
            <label htmlFor="">Password</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
          </div>
          <div className='form-group'>
            <label htmlFor="">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required/>
          </div>
        </div>

        <div className="container-box">
          <div className='form-group'>
            <label htmlFor="">First Name</label>
            <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} required/>
          </div>
          <div className='form-group'>
            <label htmlFor="">Last Name</label>
            <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} required/>
          </div>
          <div className='form-group'>
            <label htmlFor="">Address</label>
            <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} required/>
          </div>
        </div>
        
        <div className="container-box">
          <div className='form-group'>
            <label htmlFor="">Job Position</label>
            <select defaultValue={jobPosition} onChange={(event) => setJobPosition(event.target.value)}>
              <option value=""></option>
              {jobPositionDatas.map((jobPositionData) =>(
                <option value={jobPositionData._id} key={jobPositionData._id}>{jobPositionData.jobPosition}</option>
              ))}
            </select>
          </div>
          
          <div className='form-group'>
            <label htmlFor="">Telephone Number</label>
            <input type="text" value={telephoneNumber} onChange={(event) => setTelephoneNumber(event.target.value)} required/>
          </div><div className='form-group'>
            <label htmlFor="">Role</label>
            <select defaultValue={role} onChange={(event) => setRole(event.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="container-box">
          <div className='form-group'>
            <label htmlFor="">Status</label>
            <select defaultValue={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">InActive</option>
            </select>
          </div>
          
          <div className='form-group'>
            <label htmlFor="">Start Date</label>
            <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required/>
          </div><div className='form-group'>
            <label htmlFor="">End Date</label>
            <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)}/>
          </div>
        </div>

        <div className='btn-group'>
          <button type="submit" className='btn-submit btn'>Submit</button>
          <button type="reset" className='btn-reset btn' onClick={()=>handleReset()}>Reset</button>
          <button type="button" className='btn-back btn' onClick={()=> navigate("/alluser")}>Back</button>
        </div>
      </form>

      <section className={modalWarning ? "modal-overlay show" : "modal-overlay"}>
        <div className="modal">
          <h1>{warningMessage}</h1>
          <button type="button" className={warningMessage == "Create User success" ? 'close-btn warning-success' : 'close-btn warning-error'} onClick={() => handleConfirm()}>
            OK
          </button>
        </div>
      </section>
    </Wrapper>
  )
}

export default Adduser
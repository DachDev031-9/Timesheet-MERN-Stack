import React, { useState, useEffect } from 'react'
import Wrapper from '../css/Adduser'
import { useNavigate, useLoaderData } from 'react-router-dom'
import axios from 'axios'

export async function loader({ params }) {
  const user = await axios.post(`http://localhost:8080/GetOneUser/${params.id}`)
  return user.data.data;
}

function Edituser() {
  const user = useLoaderData()
  let endDatefromDatabase
  
  const startDatefromDatabase = new Date(user.startDate);
  if(user.endDate){
    endDatefromDatabase = new Date(user.endDate);
  }

  const forMattedDate = (date) => {
    if(date){
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 เพราะเดือนเริ่มที่ 0
      const day = String(date.getDate()).padStart(2, '0'); // เติมเลข 0 จะกว่าจะครบอักษร 2 ตัว
    
      return `${year}-${month}-${day}`;
    }
  }

  const [ email, setEmail ] = useState(user.email)
  const [ password, setPassword ] = useState(user.password)
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [ firstName, setFirstName ] = useState(user.firstName)
  const [ lastName, setLastName ] = useState(user.lastName)
  const [ address, setAddress ] = useState(user.address)
  const [ jobPosition, setJobPosition ] = useState(user.jobPosition)
  const [ telephoneNumber, setTelephoneNumber ] = useState(user.telephoneNumber)
  const [ role, setRole ] = useState(user.role)
  const [ status, setStatus ] = useState(user.status)
  const [ startDate, setStartDate ] = useState(forMattedDate(startDatefromDatabase))
  const [ endDate, setEndDate ] = useState(forMattedDate(endDatefromDatabase))

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
    axios.patch(`http://localhost:8080/UpdateUser/${user._id}`, formData).then((response) => {
      setWarningMessage(warningMessage = response.data.message)
      setModalWarning(true)
    })
  }

  const handleConfirm = () => {
    if(warningMessage == "Update user data success"){
      setModalWarning(false)
      navigate("/alluser")
    }else{
      setModalWarning(false)
    }
  }

  const handleReset = () => {
    setEmail(user.email)
    setPassword(user.password)
    setConfirmPassword("")
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setAddress(user.address)
    setJobPosition(user.jobPosition)
    setTelephoneNumber(user.telephoneNumber)
    setRole(user.role)
    setStatus(user.status)
    setStartDate(user.startDate)
    setEndDate(user.endDate)
  }

  return (
    <Wrapper>
      <h1>Edit User Data</h1>
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
            <select value={jobPosition} onChange={(event) => setJobPosition(event.target.value)}>
              {jobPositionDatas.map((jobPositionData) =>(
                <option value={jobPositionData._id} key={jobPositionData._id}>{jobPositionData.jobPosition}</option>
              ))}
            </select>
          </div>
          
          <div className='form-group'>
            <label htmlFor="">Telephone Number</label>
            <input type="text" value={telephoneNumber} onChange={(event) => setTelephoneNumber(event.target.value)} required/>
          </div>
          <div className='form-group'>
            <label htmlFor="">Role</label>
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="container-box">
          <div className='form-group'>
            <label htmlFor="">Status</label>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">InActive</option>
            </select>
          </div>
          
          <div className='form-group'>
            <label htmlFor="">Start Date</label>
            <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required/>
          </div>
          <div className='form-group'>
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
          <button 
            type="button" 
            className={
              warningMessage == "Update user data success" ? 
              'close-btn warning-success' : 'close-btn warning-error'} 
            onClick={() => handleConfirm()}>
            OK
          </button>
        </div>
      </section>
    </Wrapper>
  )
}

export default Edituser
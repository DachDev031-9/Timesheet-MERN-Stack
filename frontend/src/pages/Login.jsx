import React, { useState } from 'react'
import Wrapper from '../css/Login'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

// export async function action({ request }) {
//     const formData = await request.formData();
//     const data = Object.fromEntries(formData);
//     let dataAPI;
//     await axios.post(`http://localhost:8080/login`, data).then((response)=>{
//         dataAPI = response
//     })
//     if(dataAPI.data.message == "Logged in"){
//         localStorage.setItem("token",dataAPI.data.token)
//         return redirect("/dashboard")
//     }else{
//         localStorage.setItem("warning",dataAPI.data.message)
//         return null
//     }
//   }

function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    let [ warning, setWarning ] = useState("")
    let [ modalWarning, setModalWarning ] = useState(false)
    const navigate = useNavigate()
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        const formData = { email, password }
        axios.post(`http://localhost:8080/login`, formData).then((response) => {
            if(response.data.message == "Logged in"){
                localStorage.setItem("token", response.data.token)
                navigate("/")
            }else{
                setWarning(warning = response.data.message)
                setModalWarning(true)
            }
        })
    }
    
  return (
    <Wrapper>
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <div className="form-group">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>

        <section className={modalWarning ? "modal-overlay show" : "modal-overlay"}>
        <div className="modal">
          <h2>{warning}</h2>
          <button type="button" className='close-btn' onClick={() => setModalWarning(false)}>
            OK
          </button>
        </div>
      </section>
    </Wrapper>
  )
}

export default Login
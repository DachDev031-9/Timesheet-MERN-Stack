import styled from "styled-components"

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    h1 {
      text-align: center;
      margin-top: 50px;
      font-size: 50px;
    }
    .adduser-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
    }
    .container-box {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #c3c4c7;
    }
    .form-group{
        display: flex;
        flex-direction: column;
        margin: 30px;
    }
    .form-group label{
        font-size: 20px;
    }
    .form-group input{
        align-items: center;
        font-size: 20px;
        width: 300px;
        height: 40px;
        padding: 10px;
    }
    select {
      font-size: 20px;
      width: 300px;
      height: 40px;
      padding: 0px 5px;
    }
    .btn-group {
        margin-top: 50px;
    }
    .btn {
        color: white;
        font-weight: bold;
        cursor: pointer;
        margin: 0px 7px;
        border: none;
        border-radius: 5px;
        font-size: 15px;
        padding: 10px 15px;
    }
    .btn-submit {
        background-color: blue;
        padding: 10px 10px;
    }
    .btn-reset {
        background-color: green;
    }
    .btn-back {
        background-color: red;
    }
    .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.35);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }
  .modal {
    background: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    padding: 50px;
    text-align: center;
  }
  .modal h1 {
    margin-bottom: 50px;
    font-size: 40px;
  }
  .show {
    opacity: 1;
    pointer-events: auto;
  }
  .close-btn {
    padding: 10px 20px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 10px;
    border: solid 1px;
    cursor: pointer;
    color: white;
  }
  .warning-success {
    background-color: blue;
  }
  .warning-error {
    background-color: red;
  }
`

export default Wrapper
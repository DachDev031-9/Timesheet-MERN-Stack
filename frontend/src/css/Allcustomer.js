import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    .container-menubar {
      display: flex;
      flex-direction: row;
      justify-content: end;
      align-items: center;
      margin: 20px 20px;
    }
    .container-menubar button {
      font-size: 20px;
      font-weight: bold;
      color: white;
      padding: 15px;
      border-radius: 10px;
      border: none;
      margin-left: 10px;
      cursor: pointer;
    }
    .btn-active {
      background-color: greenyellow;
    }
    .btn-inactive {
      background-color: red !important;
    }
    .btn-create-customer {
        background-color: blue;
    }
    .container-content {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 15px;
      margin: 10px 20px;
      margin-bottom: auto;
    }
    .container-customer {
      font-size: 18px;
      color: white;
      background-color: darkblue;
      border-radius: 10px;
      padding: 15px;
    }
    .container-customer h1 {
        margin-bottom: 10px;
        font-size: 30px;
    }
    .container-customer p {
        padding: 5px 0px;
        font-weight: bold;
        font-size: 15px;
    }
    .container-btn-group {
        width: 100%;
        text-align: end;
        margin-top: 15px;
    }
    .container-btn-group button {
      font-size: 15px;
      font-weight: bold;
      color: white;
      border-radius: 5px;
      border: none;
      margin-left: 10px;
      padding: 9px 10px;
      cursor: pointer;
    }
    .btn-edit {
        background-color: blue;  
    }
    .btn-setstatus {
        background-color: red;
    }

    .container-current-page {
      text-align: center;
      margin-bottom: 25px;
    }
    .container-current-page button {
      font-size: 15px;
      font-weight: bold;
      color: white;
      background-color: blue;
      border-radius: 5px;
      border: none;
      margin: 0px 5px;
      padding: 8px;
    }
    .current-page-btn-active {
      cursor: pointer;
    }
    .container-current-page span {
      font-size: 20px;
      font-weight: bold;
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
  .show {
    opacity: 1;
    pointer-events: auto;
  }
  .container-modal {
    background: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    padding: 50px;
    text-align: center;
  }
  .container-modal h1 {
    font-size: 40px;
    margin-bottom: 30px;
  }
  .form-group{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 30px;
    margin-bottom: 30px;
  }
  .form-group label{
    font-size: 20px;
    margin-bottom: 5px;
  }
  .form-group input{
    font-size: 20px;
    width: 300px;
    height: 40px;
    padding: 10px;
  }
  form button {
    font-size: 20px;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    color: white;
    border: none;
    margin: 0px 8px;
  }
  .submit-btn {
    background-color: blue;
    padding: 10px 20px;
  }
  .delete-btn {
    background-color: red;
    padding: 10px 25px;
  }
  .close-btn {
    background-color: orange;
    padding: 10px 25px;
  }
  .reset-btn {
        background-color: green;
        padding: 10px 25px;
    }
`

export default Wrapper
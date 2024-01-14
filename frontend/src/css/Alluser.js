import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    .container-btn-menubar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 20px 20px;
    }
    .btn-group-jobposition button {
      background-color: blue;
      color: white;
      font-weight: bold;
      font-size: 20px;
      padding: 10px;
      cursor: pointer;
      border: 1px solid black;
    }
    .btn-group-jobposition-active {
      background-color: white !important;
      color: blue !important;
    }

    .btn-active {
      margin-left: auto;
      margin-right: 10px;
      color: white;
      font-size: 22px;
      font-weight: bold;
      background-color: greenyellow;
      border-radius: 10px;
      padding: 15px;
      border: none;
      cursor: pointer;
    }
    .inactive {
      background-color: red !important;
    }
    .btn-create-user {
        color: white;
        text-decoration: none;
        font-size: 22px;
        font-weight: bold;
        background-color: blue;
        border-radius: 10px;
        padding: 15px;
    }
    .container {
        margin: 10px 20px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 15px;
        margin-bottom: auto;
    }
    .userContainer {
        border-radius: 10px;
        padding: 15px;
        background-color: darkblue;
        color: white;
        font-size: 18px;
    }
    .userContainer h1 {
        margin-bottom: 10px;
        font-size: 30px;
    }
    .userContainer p {
        padding: 5px 0px;
        font-weight: bold;
        font-size: 15px;
    }
    .btn-group {
        width: 100%;
        text-align: end;
        margin-top: 15px;
    }
    .btn-manage-user {
      color: white;
      border-radius: 5px;
      border: none;
      font-weight: bold;
      cursor: pointer;
      margin-left: 10px;
    }
    .btn-edit {
        background-color: blue;
        padding: 10px 15px;
        text-decoration: none;
        font-size: 15px;
    }
    .btn-manage-status {
        background-color: red;
        padding: 10px;
    }
    .current-page {
      text-align: center;
      margin-bottom: 25px;
    }
    .current-page button {
      font-size: 15px;
      padding: 8px;
      background-color: blue;
      color: white;
      font-weight: bold;
      border-radius: 5px;
      border: none;
      margin: 0px 5px;
    }
    .active {
      cursor: pointer;
    }
    .current-page span {
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
  .container-modal {
    background: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    padding: 50px;
    text-align: center;
  }
  .container-modal h1 {
    margin-bottom: 50px;
    font-size: 40px;
  }
  .show {
    opacity: 1;
    pointer-events: auto;
  }
  .btn-in-manage-status {
    padding: 10px 25px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 10px;
    border: solid 1px;
    cursor: pointer;
    color: white;
    margin: 0px 4px;
  }
  .submit-btn {
    background-color: blue;
  }
  .delete-btn {
    background-color: red;
  }
  .close-btn {
    background-color: orange;
  }
`

export default Wrapper
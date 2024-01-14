import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #f0f0f0;
    .login-container{
        background-color: white;
        padding: 30px 100px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .login-container h1{
        font-size: 50px;
        text-align: center;
        margin-bottom: 40px;
    }
    .form-group{
        display: flex;
        flex-direction: column;
        margin-bottom: 30px;
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
    .form-group button{
        font-size: 20px;
        color: white;
        padding: 5px;
        width: 90px;
        background-color: blue;
        border: none;
        cursor: pointer;
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
    pointer-events: none; /* ทำให้ Modal-container ไม่สามารถคลิกหรือโต้ตอบได้ */
    opacity: 0; /* ทำการซ่อนตัว Modal ไว้ || ทำให้จางลง */
    /* visibility: hidden; ใช้วิธีการปรับความทึบ หรือ ซ่อนก็ได้ */
    transition: all 0.2s ease-in-out;
  }
  .modal {
    background: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    padding: 50px;
    text-align: center;
  }
  h2 {
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
    background-color: red;
    font-weight: bold;
    border-radius: 10px;
    border: solid 1px;
    cursor: pointer;
    color: white;
  }
`

export default Wrapper
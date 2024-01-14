import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    /* background-color: #f0f0f0; */
    background-color: darkgray;
    padding: 15px;
    height: 100vh;
    width: 100vw;
    .sidebar {
        background-color: rgba(255, 255, 255, 1);
        width: 400px;
        border-radius: 10px;
    }
    .navbar-and-content {
        display: flex;
        flex-direction: column;
        width: 100vw;
        margin-left: 15px;
    }
    .navbar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
        background-color: white;
        height: 100px;
        margin-bottom: 15px;
        border-radius: 10px;
    }
    /* .navbar h1 {
        font-size: 50px;
        font-weight: bold;
        margin-left: 30px;
    } */
    .btn-logout {
        font-size: 20px;
        background-color: red;
        color: white;
        border: none;
        border-radius: 10px;
        padding: 10px;
        margin-right: 20px;
        cursor: pointer;
        font-weight: bold;
    }
    .content {
        background-color: rgba(255, 255, 255, 1);
        height: 100vh;
        border-radius: 10px;
    }
`

export default Wrapper
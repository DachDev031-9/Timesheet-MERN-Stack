import styled from "styled-components";

const Wrapper = styled.div`
    h1 {
        font-size: 50px;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 80px;
    }
    a {
        display: inline-block;
        padding-left: 20px;
        font-size: 20px;
        text-decoration: none;
        color: black;
        height: 100%;
        width: 100%;
        padding: 15px 0px;
        padding-left: 30px;
        font-weight: bold;
        transition: all 0.3s ease;
    }
    .active a {
        background-color: blue;
        color: white;
    }
`

export default Wrapper
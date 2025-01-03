import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:rgb(255, 255, 255); 
  color: black;
`;

export const InfoContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  margin-top: 80px; 

  h1 {
    margin-bottom: 10px;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  color: black;
  width: 80%;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  thead{
    background-color:rgb(44, 37, 37);
    color: white;
  }

  th {
    background-color:rgb(44, 37, 37);
    text-align: left;
  }
`;

export const Button = styled.button`
  margin: 5px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;
export const ErrorMensagem = styled.span`
  display: flex;
  justify-content: center;
  padding: 10px;
  width: 40%;
  background-color: #f44336;
  margin-top: 20px;
  border-radius: 5px;
`;

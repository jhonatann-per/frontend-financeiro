import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:rgb(26, 40, 139); 
  color: white;
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
  width: 80%;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
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

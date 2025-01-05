import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #f4f4f4;
`;

export const ButtonVoltar  = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 50%;

  @media screen and (max-width: 912px) {
    width: 70%;
  }

  @media screen and (max-width: 430px) {
    width: 80%;
  }

  @media screen and (max-width: 414px) {
    width: 80%;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ErrorMensagem = styled.p`
  color: red;
  margin-top: 10px;
`;

export const SuccessMensagem = styled.p`
  color: green;
  margin-top: 10px;
`;


export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
`;

export const ErrorStatus = styled.p`
  color: red;
`;
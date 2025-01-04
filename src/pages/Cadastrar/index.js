import React, { useState, useEffect } from "react";
import { Container, Form, Button, ErrorMensagem, 
    SuccessMensagem, FormGroup, Label, Select, Input, ButtonVoltar } from "./styles"; 
import { NumericFormat } from "react-number-format";
import { api } from "../../config/configApi";
import { Link } from "react-router-dom";

export const Cadastrar = () => {
  const [lancamentoData, setLancamentoData] = useState({
    nome: "",
    valor: "",
    tipo: "",
    situacao: "",
    dataPagamento: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const limparCampos = () => {
    setLancamentoData({
      nome: "",
      valor: "",
      tipo: "",
      situacao: "",
      dataPagamento: "",
    });
  };
  
  const valorInput = (e) => {
    setLancamentoData({ ...lancamentoData, [e.target.name]: e.target.value });
  };

  const valorFormatado = (values) => {
    const { formattedValue, value } = values;
    setLancamentoData({ ...lancamentoData, valor: value });
  };

  const cadLancamento = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json'
    };

    await api.post("/cadastrar-lancamento", lancamentoData, { headers })
      .then((response) => {
        console.log(response);
        setStatus({
          type: 'success',
          message: response.data.mensagem
        });
        limparCampos();
      }).catch((err) => {
        setStatus({ 
          type: "error", 
          message: "Erro ao realizar cadastro. " + err 
        });
      });

    setTimeout(() => {
      setStatus({
        type: "",
        message: "",
      });
    }, 4000);
  };

  return (
    <Container>
      <h1>Cadastro</h1>
      <Link to="/"><ButtonVoltar>Voltar</ButtonVoltar></Link>
      <Form onSubmit={cadLancamento}>
        <FormGroup>
          <Label>Nome:</Label>
          <Input
            type="text"
            name="nome"
            value={lancamentoData.nome}
            onChange={valorInput}
          />
        </FormGroup>
        <FormGroup>
          <Label>Valor:</Label>
          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            fixedDecimalScale={true}
            decimalScale={2}
            name="valor"
            value={lancamentoData.valor}
            onValueChange={valorFormatado}
            customInput={Input}
          />
        </FormGroup>
        <FormGroup>
          <Label>Tipo:</Label>
          <Select name="tipo" 
            value={lancamentoData.tipo} 
            onChange={valorInput}>
            <option value="">Selecione:</option>
            <option value="1">Pagamento</option>
            <option value="2">Recebido</option>
            </Select>
        </FormGroup>
        <FormGroup>
          <Label>Situação:</Label>
          <Select name="situacao" 
            value={lancamentoData.situacao} 
            onChange={valorInput}>
            <option value="">Selecione:</option>
            <option value="1">Pago</option>
            <option value="2">Pendente</option>
            <option value="3">Recebido</option>
            </Select>
        </FormGroup>
        <FormGroup>
          <Label>Data de Pagamento:</Label>
          <Input
            type="date"
            name="dataPagamento"
            value={lancamentoData.dataPagamento}
            onChange={valorInput}
          />
        </FormGroup>
        <Button type="submit">Cadastrar</Button>
        {status.type === "success" ? <SuccessMensagem>{status.message}</SuccessMensagem> : status.type === "error" ? <ErrorMensagem>{status.message}</ErrorMensagem> : ""}
      </Form>
    </Container>
  );
};

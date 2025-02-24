import React, { useEffect, useState } from "react";
import { Container, InfoContainer, Table, Button, ErrorMensagem } from "./styles";
import { api } from "../../config/configApi";
import { Link } from "react-router-dom";
import moment from "moment";

export const Home = () => {
  const dataAtual = new Date();
  const anoInicial = dataAtual.getFullYear();
  const mesInicial = dataAtual.getMonth() + 1;

  const [data, setData] = useState([]);
  const [dataView, setDataView] = useState({ ano: anoInicial, mes: mesInicial });
  const [saldoFinal, setSaldoFinal] = useState("");
  const [valorRecebido, setValorRecebido] = useState("");
  const [valorPago, setValorPago] = useState("");
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const anterior = async () => {
    let { ano, mes } = dataView;

    if (mes === 1) {
      ano -= 1;
      mes = 12;
    } else {
      mes -= 1;
    }

    setDataView({ ano, mes });
  };

  const proximo = async () => {
    let { ano, mes } = dataView;

    if (mes === 12) {
      ano += 1;
      mes = 1;
    } else {
      mes += 1;
    }

    setDataView({ ano, mes });
  };

  const reload = async () => {
    if (dataView.mes !== mesInicial || dataView.ano !== anoInicial) {
      setDataView({ ano: anoInicial, mes: mesInicial });
      listarExtrato(anoInicial, mesInicial);
    }
  };

  const listarExtrato = async (ano, mes) => {
    if (mes === undefined && ano === undefined) {
      ano = anoInicial;
      mes = mesInicial;
    }

    await api.get('/listar-lancamentos/' + mes + '/' + ano)
      .then((response) => {
        setData(response.data.lancamento);
        setSaldoFinal(response.data.saldoFinal);
        setValorPago(response.data.valorPago);
        setValorRecebido(response.data.valorRecebido);
      })
      .catch((err) => {
        if (err.response) {
          setStatus({
            type: 'error',
            message: err.response.data.message
          });
        } else {
          setStatus({
            type: 'error',
            message: 'Erro: Tente mais tarde Api fora do ar!'
          });
        }
      });
  };

  useEffect(() => {
    listarExtrato(dataView.ano, dataView.mes);
  }, [dataView]);

  const apagarRegistro = async (id) => {
    try {
      const headers = {
        'Content-Type': 'application/json'
      }
      const response = await api.delete(`/excluir-lancamento/${id}`, { headers });
      console.log(response.data.mensagem);
      setStatus({
        type: 'success',
        message: response.data.mensagem
      });
      setData(data.filter(item => item.id !== id));
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Erro: Tente mais tarde Api fora do ar!'
      });
    }
  };

  return (
    <Container>
      <InfoContainer>
        <h1>Registro: Ano {dataView.ano} Mês: {dataView.mes}</h1>
        <Button onClick={anterior}>Anterior</Button>
        <Button onClick={proximo}>Próximo</Button>
        <Button onClick={reload}>Mês Atual</Button>
        <Link to="/cadastrar"><Button>Cadastrar</Button></Link>
      </InfoContainer>
      <Table>
        <thead>
          <tr>
            <th>Id:</th>
            <th>Nome:</th>
            <th>Tipo:</th>
            <th>Situação</th>
            <th>Data de Pagamento</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.tipo === 1 ? "Pagamento" : "Recebido"}</td>
              <td style={{ color: item.situacao === 1 ? 'green' : item.situacao === 2 ? 'orange' : item.situacao === 3 ? 'blue' : 'red' }}>
                {item.situacao === 1
                  ? "Pago"
                  : item.situacao === 2
                  ? "Pendente"
                  : item.situacao === 3
                  ? "Recebido"
                  : "Erro"}
              </td>
              <td>{moment(item.dataPagamento).format('DD/MM/YYYY')}</td>
              <td>{new Intl.NumberFormat('pt-BR', {
                 style: 'currency', currency: 'BRL' }).format(item.valor)}</td>
              <td>
                <Button to={"#"} onClick={() => apagarRegistro(item.id)}>Apagar</Button>
                <Link to={"/editar/" + item.id}><Button>Editar</Button></Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
          </tr>
          <tr>    
            <td>Saldo</td>
            <td>{new Intl.NumberFormat('pt-BR', {
               style: 'currency', currency: 'BRL' }).format(saldoFinal)}</td>
            <td>Pago</td>
            <td>{new Intl.NumberFormat('pt-BR', {
               style: 'currency', currency: 'BRL' }).format(valorPago)}</td>
            <td>Recebido</td>
            <td>{new Intl.NumberFormat('pt-BR', {
               style: 'currency', currency: 'BRL' }).format(valorRecebido)}</td>
          </tr> 
        </tfoot>
      </Table>
      {status.type === "error" ? <ErrorMensagem>{status.message}</ErrorMensagem> : ""}
    </Container>
  );
};

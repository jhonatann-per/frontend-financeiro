import React, { useEffect, useState } from "react";
import { Container, InfoContainer, Table, Button } from "./styles";

export const Home = () => {
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth() + 1;

  const [data, setData] = useState([]);

  const [dataView, setDataView] = useState({ ano, mes });

  const anterior = async () => {
    if (dataView.mes === 1) {
      setDataView({ ano: dataView.ano - 1, mes: 12 });
    } else {
      setDataView({ ano: dataView.ano, mes: dataView.mes - 1 });
    }
  };

  const proximo = async () => {
    if (dataView.mes === 12) {
      setDataView({ ano: dataView.ano + 1, mes: 1 });
    } else {
      setDataView({ ano: dataView.ano, mes: dataView.mes + 1 });
    }
  };

  const reload = async () => {
    if (dataView.mes !== mes || dataView.ano !== ano) {
      setDataView({ ano, mes });
    }
  };

  const listarExtrato = async () => {
    const valores = [
      { id: 1, nome: "Luz", valor: 364, tipo: 1, situação: "Pago" },
      { id: 2, nome: "Água", valor: 250, tipo: 1, situação: "Pago" },
      { id: 3, nome: "Gás", valor: 120, tipo: 1, situação: "Pago" },
      { id: 4, nome: "Salário", valor: 1364.0, tipo: 2, situação: "" },
    ];
    setData(valores);
  };

  useEffect(() => {
    listarExtrato();
  }, []);

  return (
    <Container>
      <InfoContainer>
        <h1>{dataView.ano} Mês: {dataView.mes}</h1>
        <Button onClick={anterior}>Anterior</Button>
        <Button onClick={proximo}>Próximo</Button>
        <Button onClick={reload}>Atual</Button>
      </InfoContainer>
      <Table>
        <thead>
          <tr>
            <th>Id:</th>
            <th>Nome:</th>
            <th>Tipo:</th>
            <th>Valor:</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.tipo === 1 ? "Pagamento" : "Recebido"}</td>
              <td>{item.situação}</td>
              <td>{item.valor}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>500.50</td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
};

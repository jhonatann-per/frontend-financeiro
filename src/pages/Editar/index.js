import React, { useState, useEffect } from "react"; 
import { Container, Form, Button, ErrorMensagem, 
    SuccessMensagem, FormGroup, Label, Select, Input, ButtonVoltar } from "./styles";
import { NumericFormat } from "react-number-format"; 
import { api } from "../../config/configApi"; 
import { Link, useParams } from "react-router-dom"; 

export const Editar = () => { 

    const { id } = useParams(); 
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

    useEffect(() => {
        getLancamento(); 
    }, [id]);

    const getLancamento = async () => {
        try {
            const response = await api.get(`/buscar-lancamentos/${id}`,);
            console.log('Dados recebidos do backend:', response.data.buscarExtrato);
            setLancamentoData({
                nome: response.data.buscarExtrato.nome || "", 
                valor: response.data.buscarExtrato.valor || "",
                tipo: response.data.buscarExtrato.tipo || "",
                situacao: response.data.buscarExtrato.situacao || "",
                dataPagamento: formatDate(response.data.buscarExtrato.dataPagamento) || "" 
               
            });
        } catch (err) {
            console.log('Erro ao buscar lançamento:', err); 
            setStatus({
                type: 'error',
                message: 'Erro ao buscar lançamento. Tente novamente mais tarde.'
            });
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return ""; 
        // Retorna string vazia se a data não estiver definida.
        const date = new Date(dateString); 
        // Converte a string de data em um objeto Date.
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        // Adiciona zero à esquerda se o mês tiver um dígito.
        const day = String(date.getDate()).padStart(2, '0'); 
        // Adiciona zero à esquerda se o dia tiver um dígito.
        return `${year}-${month}-${day}`; 
        // Retorna a data no formato yyyy-MM-dd.
    };

    const valorInput = (e) => {
        setLancamentoData({ ...lancamentoData, [e.target.name]: e.target.value });
    };

    const valorFormatado = (values) => {
        const { formattedValue, value } = values;
        setLancamentoData({ ...lancamentoData, valor: value }); 
    };

    const editarLancamento = async (e) => {
        e.preventDefault(); 
        const headers = {
            'Content-Type': 'application/json'
        };

        await api.put(`/editar-lancamento/${id}`, lancamentoData, { headers }) 
            .then((response) => {
                console.log(response); 
                setStatus({
                    type: 'success',
                    message: response.data.mensagem
                });
            }).catch((err) => {
                setStatus({ 
                    type: "error", 
                    message: "Erro ao editar lançamento. " + err 
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
            <h1>Editar Lançamento</h1>
            <Link to="/"><ButtonVoltar>Voltar</ButtonVoltar></Link> 
            <Form onSubmit={editarLancamento}>
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
                        // Define o separador de milhar.
                        decimalSeparator="," 
                        // Define o separador decimal.
                        prefix="R$ " 
                        // Adiciona o prefixo "R$".
                        fixedDecimalScale={true}
                        decimalScale={2} 
                        // Define duas casas decimais.
                        name="valor"
                        value={lancamentoData.valor} 
                        // Campo controlado com valor do estado.
                        onValueChange={valorFormatado} 
                        // Atualiza o estado com o valor formatado.
                        customInput={Input} 
                        // Utiliza o componente Input estilizado.
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
                <Button type="submit">Editar</Button>
                {status.type === "success" ? <SuccessMensagem>{status.message}</SuccessMensagem> : status.type === "error" ? <ErrorMensagem>{status.message}</ErrorMensagem> : ""}
            </Form>
        </Container>
    );
};

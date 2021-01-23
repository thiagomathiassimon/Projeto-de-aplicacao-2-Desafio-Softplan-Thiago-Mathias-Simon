import Botao from '../components/Button';
import Dialog from '../components/Dialog';
import Outline from '../components/Outline';
import Loading from '../components/Loading';
import SmallList from '../components/SmallList';
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SimpleList from '../components/SimpleList';
import { useSelector, useDispatch } from 'react-redux';
import { buscarProcessos, excluirProcessso } from '../redux/processo/actions';

export default function TelaDeListagem(props) {
  const { processos, processo, salvar, filtrarDados, handleEditar, handleExcluir, estado, handleClose, handleClickOpen } = props;

  let process = window.localStorage.getItem('processoAtual');
  console.log('process', process)
  // const processos = useSelector(getProcessos);
  const dispatch = useDispatch();

  const [trocaLista, setTrocaLista] = useState(false);
  const [carregada, setCarregada] = useState(false);
  const [processoAtual, setProcessoAtual] = useState('');

  useEffect(() => {
    dispatch(buscarProcessos());
  }, [dispatch]);

  const handleExcluirProcesso = processo => {
    dispatch(excluirProcessso(processo));
  }

  const filtrar = q => {
    dispatch(buscarProcessos(q));
  }

  const handleClick = processo => {
    console.log('ativando o handleClick')
    console.log('processo', processo)
  }

  const processo2 = {
    numero: "SOFT 0001/2021",
    assunto: "Sem assunto",
    interessado: "Todos",
    descricao: " É uma parte do Universo que os astrônomos sabem que existe, mas ainda não sabem exatamente o que seja. É matéria, porque se consegue medir sua existência por meio da força gravitacional que ela exerce... Leia mais em: https://super.abril.com.br/mundo-estranho/o-que-e-materia-escura-2/",
    data: "21/01/2021",
    interessados: [
      { nome: "Gerente" },
      { nome: "Advogado" },
      { nome: "Funcionário" },
      { nome: "Dono" },
      { nome: "Subgerente" }
    ]
  }

  // const processos = [
  //   {
  //     numero: "SOFT 0001/2018",
  //     assunto: "Sem assunto",
  //     interessado: "Todos",
  //     descricao: "Detalhada"
  //   },
  //   {
  //     numero: "SOFT 0002/2018",
  //     assunto: "Sem assunto",
  //     interessado: "Todos",
  //     descricao: "Detalhada"
  //   }
  // ]
  return (
    <>
      <br />
      <br />
      <h2 className="title" id="secondTitle">Busca de<br />processos</h2>
      <div id="secondDiv">
        <SearchBar filtrarDados={filtrar} handleClick={() => console.log("Oi")} />
      </div>
      <Botao handleClick={handleClickOpen} />
      <br />
      <br />
      <br />
      {!carregada &&
        <Loading />
      }
      {!carregada && setTimeout(() => { setCarregada(true) }, 2000)}
      {!trocaLista && carregada && <SimpleList processos={processos} handleClick={() => {
        console.log(this)
        setTrocaLista(!trocaLista)
      }} />}
      {trocaLista &&
        <>
          <div id="divSmallList" >
            <SmallList processos={processos} processoAtual={processoAtual} setProcessoAtual={setProcessoAtual} />
          </div>
          <Outline processo={processo2} editar={handleEditar} excluir={handleExcluir} />
        </>
      }
      <Dialog processo={processo} estado={estado} handleClose={handleClose} salvar={salvar} />
    </>
  )
}
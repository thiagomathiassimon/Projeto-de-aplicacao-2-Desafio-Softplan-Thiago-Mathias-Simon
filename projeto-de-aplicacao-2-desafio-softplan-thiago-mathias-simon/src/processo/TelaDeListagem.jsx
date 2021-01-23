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

  const voltar = () => {
    setTrocaLista(false);
  }

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
          <Outline editar={handleEditar} excluir={handleExcluir} voltar={voltar} />
        </>
      }
      <Dialog estado={estado} handleClose={handleClose} salvar={salvar} voltar={voltar} />
    </>
  )
}
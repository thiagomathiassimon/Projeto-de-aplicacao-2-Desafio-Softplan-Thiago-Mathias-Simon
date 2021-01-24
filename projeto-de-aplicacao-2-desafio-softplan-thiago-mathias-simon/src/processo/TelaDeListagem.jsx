import { useDispatch } from 'react-redux';
import Botao from '../components/Button';
import Dialog from '../components/Dialog';
import Outline from '../components/Outline';
import Loading from '../components/Loading';
import SmallList from '../components/SmallList';
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SimpleList from '../components/SimpleList';
import { buscarProcessos } from '../redux/processo/actions';

export default function TelaDeListagem(props) {

  const { processos, salvar, handleEditar, handleExcluir, estado, handleClose, handleClickOpen } = props;

  const [processoAtual, setProcessoAtual] = useState('');

  const [trocaLista, setTrocaLista] = useState(false);

  const [carregada, setCarregada] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buscarProcessos());
  }, [dispatch]);

  const filtrar = q => {
    dispatch(buscarProcessos(q));
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
        <SearchBar filtrarDados={filtrar} handleClick={voltar} />
      </div>
      <Botao handleClick={handleClickOpen} />
      <br />
      <br />
      <br />
      {!carregada &&
        <Loading />
      }
      {!carregada && setTimeout(() => { setCarregada(true) }, 2000)}
      {!trocaLista && carregada &&
        <SimpleList processos={processos} handleClick={() => { setTrocaLista(!trocaLista) }} />
      }
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
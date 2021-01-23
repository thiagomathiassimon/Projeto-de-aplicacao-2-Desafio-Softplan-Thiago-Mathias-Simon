import '../assets/css/estilo.css';
import { useSelector } from 'react-redux';
import TelaInicial from '../processo/TelaInicial';
import ProcessoAPI from '../services/processos';
import React, { useState, useEffect } from 'react';
import TelaDeListagem from '../processo/TelaDeListagem';
import { getProcessoEmDestaque } from '../redux/processo/selectors';


export default function Processo() {

  const processoEmDestaque = useSelector(getProcessoEmDestaque);

  const [processos, setProcessos] = useState([]);

  const [listar, setListar] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("Passou pelo useEffect")
    carregarProcessos();
  }, []);

  const carregarProcessos = async () => {
    const processos = await ProcessoAPI.buscarProcessos();
    setProcessos(processos);
    console.log(processos);
  }

  const editarProcesso = () => {
    handleClickOpen();
  }

  const excluirProcesso = () => {
    console.log('processoEmDestaque', processoEmDestaque)
    ProcessoAPI.excluirProcesso(processoEmDestaque.id).then(() => carregarProcessos());
  }

  const salvarProcesso = (processo) => {
    if (processo.id) {
      console.log("Não passou no else do método salvarProcesso()")
      ProcessoAPI.atualizarProcesso(processo).then(() => {
        carregarProcessos();
      });
      return;
    }
    console.log("Passando no else do if do salvarProcesso()")
    ProcessoAPI.inserirProcesso(processo).then(() => {
      carregarProcessos();
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {listar === false &&
        <TelaInicial handleClick={() => setListar(!listar)} salvar={salvarProcesso} filtrarDados={() => console.log('Filtro em manutenção!')}
          estado={open} handleClose={handleClose} handleClickOpen={handleClickOpen} />
      }
      {listar &&
        <TelaDeListagem processos={processos} salvar={salvarProcesso} handleEditar={editarProcesso} handleExcluir={excluirProcesso}
          estado={open} handleClose={handleClose} handleClickOpen={handleClickOpen} />
      }
    </>
  );
}

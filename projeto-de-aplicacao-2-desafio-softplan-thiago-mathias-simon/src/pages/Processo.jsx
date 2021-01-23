import '../assets/css/estilo.css';
import TelaInicial from '../processo/TelaInicial';
import ProcessoAPI from '../services/processos';
import React, { useState, useEffect } from 'react';
import TelaDeListagem from '../processo/TelaDeListagem';

export default function Processo() {

  const [processos, setProcessos] = useState([]);
  const [processoEmEdicao, setProcessoEmEdicao] = useState();

  const [listar, setListar] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("Passou pelo useEffect")
    carregarProcessos();
  }, []);

  useEffect(() => {
    console.log("processoEmEdicao no Update", processoEmEdicao)
  }, [processoEmEdicao]);

  const carregarProcessos = async () => {
    const processos = await ProcessoAPI.buscarProcessos();
    setProcessos(processos);
    console.log(processos);
  }

  const editarProcesso = (processo) => {
    console.log(processo)
    setProcessoEmEdicao(processo);
    handleClickOpen();
    console.log('open', open)
  }

  const excluirProcesso = (processo) => {
    ProcessoAPI.excluirProcesso(processo.id).then(() => carregarProcessos());
  }

  const salvarProcesso = (processo) => {
    if (processo.id) {
      console.log("Não passou no else do método salvarProcesso()")
      ProcessoAPI.atualizarProcesso(processo).then(() => {
        carregarProcessos();
        setProcessoEmEdicao(null);
      });
      return;
    }
    console.log("Passando no else do if do salvarProcesso()")
    ProcessoAPI.inserirProcesso(processo).then(() => {
      carregarProcessos();
      setProcessoEmEdicao(null);
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
        <TelaInicial processo={processoEmEdicao} handleClick={() => setListar(!listar)} salvar={salvarProcesso} filtrarDados={() => console.log('Filtro em manutenção!')}
          estado={open} handleClose={handleClose} handleClickOpen={handleClickOpen} />
      }
      {listar &&
        <TelaDeListagem processos={processos} processo={processoEmEdicao} salvar={salvarProcesso} handleEditar={editarProcesso} handleExcluir={excluirProcesso}
          estado={open} handleClose={handleClose} handleClickOpen={handleClickOpen} />
      }
    </>
  );
}

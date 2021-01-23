import React from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ImagemDeX from "../assets/img/imagemX.png";
import { processoEmDestaque } from '../redux/processo/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 1000,
  },
}));

export default function SimpleList(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { processos, handleClick } = props;

  console.log('processos no SimpleList', processos)

  return (
    <>
      {processos.map(processo => {
        console.log('processo', processo)
        return (
          <>
            <button className="lista" key={processo.numero}
              onClick={() => {
                console.log(processo);
                dispatch(processoEmDestaque(processo));
                handleClick();
              }}>
              <Paper component="form" className={classes.root}>
                <img className="noneImg" src={ImagemDeX} alt="Imagem vazia" />
                <table >
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Assunto</th>
                      <th>Interessados</th>
                      <th>Descrição</th>
                    </tr>
                  </thead>
                  <br />
                  <tbody >
                    <tr>
                      <td>{processo.numero}</td>
                      <td>{processo.assunto}</td>
                      <td>{processo.interessados.map(interessado => {
                        return (
                          <tr>
                            <td>{interessado}</td>
                          </tr>
                        )
                      }
                      )}</td>
                      <td>{processo.descricao}</td>
                    </tr>
                  </tbody>
                </table>
              </Paper>
            </button>
            <br />
            <br />
          </>
        )
      }
      )
      }
    </>
  )
}



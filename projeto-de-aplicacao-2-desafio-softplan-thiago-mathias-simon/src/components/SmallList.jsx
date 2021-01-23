import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { processoEmDestaque } from '../redux/processo/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
}));

export default function SmallList(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { processos, processoAtual, setProcessoAtual } = props;

  return (
    <>
      {processos.map(processo => {
        return (
          <>
            <button className="lista" key={processo.numero}
              onClick={() => {
                console.log(processo)
                dispatch(processoEmDestaque(processo))
              }} >
              <Paper component="form" className={classes.root}>
                <table>
                  <thead />
                  <tbody>
                    <tr>
                      <table >
                        <thead>
                          <tr>
                            <th>Número</th>
                            <th>Assunto</th>
                          </tr>
                        </thead>
                        <tbody >
                          <tr>
                            <td>{processo.numero}</td>
                            <td>{processo.assunto}</td>
                          </tr>
                        </tbody>
                      </table>
                    </tr>
                    <tr>
                      <table>
                        <thead>
                          <tr>
                            <th>Interessados</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{processo.interessados.map(interessado => {
                              return (
                                <tr>
                                  <td>{interessado}</td>
                                </tr>
                              )
                            }
                            )}</td>
                          </tr>
                        </tbody>
                      </table>
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



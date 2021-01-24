import React from 'react';
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

  const { processos } = props;

  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <>
      {processos.map(processo => {
        return (
          <>
            <button className="lista" key={processo.numero}
              onClick={() => {
                console.log(processo)
                dispatch(processoEmDestaque(processo))
              }}>
              <Paper component="form" className={classes.root}>
                <table>
                  <thead />
                  <tbody>
                    <tr>
                      <table >
                        <thead>
                          <tr>
                            <th className="listItem">Número</th>
                            <th className="listItem">Assunto</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="listItem">{processo.numero}</td>
                            <td className="listItem">{processo.assunto}</td>
                          </tr>
                        </tbody>
                      </table>
                    </tr>
                    <tr>
                      <table>
                        <thead>
                          <tr>
                            <th className="listItem">Interessados</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="listItem">{processo.interessados.map(interessado => {
                              return (
                                <tr>
                                  <td className="listItem">{interessado}</td>
                                </tr>
                              )
                            }
                            )}
                            </td>
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
      )}
    </>
  )
}

import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import { pesquisa } from '../redux/processo/actions';
import { getPesquisa } from '../redux/processo/selectors';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const search = useSelector(getPesquisa);
  const dispatch = useDispatch();

  const [q, setQ] = useState();
  const [serachTerm, setSearchTerm] = useState(search);

  const { handleClick, filtrarDados } = props;

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Pesquise por uma informação do processo"
        value={serachTerm}
        onChange={e => {
          setSearchTerm(e.target.value)
          console.log(serachTerm)
        }}
      />
      <IconButton type="button" className={classes.iconButton} aria-label="search"
        onClick={() => {
          console.log(serachTerm)
          dispatch(pesquisa(serachTerm))
          filtrarDados(q);
          handleClick();
          return (console.log(q))
        }
        }
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )

}
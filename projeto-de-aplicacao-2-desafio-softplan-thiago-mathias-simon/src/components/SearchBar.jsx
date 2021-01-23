import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

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

  const [q, setQ] = useState();

  const { handleClick, filtrarDados } = props;

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Pesquise por uma informação do processo"
        onChange={e => setQ(e.target.value)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search"
        onClick={() => {
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
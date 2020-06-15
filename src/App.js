import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
function App() {
  const classes = useStyles();

  return (
    <div id="main">Hello
    <div className={classes.root}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>xs=12</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>xs=6</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>xs=6</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
    </Grid>
  </div>
  </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

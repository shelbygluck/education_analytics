import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Grid';


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
        <Paper className={classes.paper}>school name/alias</Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>school website</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>city</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>state</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>zip</Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Student Population: </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Graph 1</Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Graph 2</Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Graph 3</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <Button onClick={() => {alert('save')}} className="button" variant="contained">SAVE</Button>
        </Paper>
      </Grid>
      <Grid item xs={4}>
      <Paper className={classes.paper}>
          <Button onClick={() => {alert('download')}} className="button" variant="contained">DOWNLOAD</Button>
        </Paper>
      </Grid>
      <Grid item xs={4}>
      <Paper className={classes.paper}>
          <Button onClick={() => {alert('print')}} className="button" variant="contained">PRINT</Button>
        </Paper>
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

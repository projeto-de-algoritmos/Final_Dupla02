import { useState, useEffect } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Map from './components/Map/Map';
import './algorithm/aStar';

const londonGraph = require("./data/londonGraph.json");

function App() {
  aStar;
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={3}>
          <h1>London Underground</h1>
          <SearchPath
            londonGraph={londonGraph}
            handleInitialStation={handleInitialStation}
            handleFinalStation={handleFinalStation}
            handleSearch={handleSearch}
          />
        </Grid>
        <Grid item xs={9}>
          <Map londonGraph={londonGraph} handleStation={handleStation} path={path} pathPairs={pathPairs}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;

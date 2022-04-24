import { useState, useEffect } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Map from './components/Map/Map';
import SearchPath from './components/SearchPath/SearchPath';

const londonGraph = require("./data/londonGraph.json");

function App() {
  const [initialStation, setInitialStation] = useState(0);
  const [finalStation, setFinalStation] = useState(0);
  const [isInitialStation, setIsInitialStation] = useState(true);
  const [path, setPath] = useState([]);

  useEffect(() => {
    const markers = document.querySelectorAll(".markers");

    path.forEach(station => {
      markers[station].style.stroke = "red";
      markers[station].style.fill = "red";
      
    })
  }, [path]); 

  const handleInitialStation = (newStation) => {
    setInitialStation(newStation);
  }

  const handleFinalStation = (newStation) => {
    setFinalStation(newStation);
  }

  const handleSearch = () => {
    console.log(initialStation);
    console.log(finalStation);
    setPath([10, 162, 81, 191, 20, 34, 45, 1]);
  }

  const handleStation = (newStation) => {
    // if(isInitialStation){
    //   handleInitialStation(newStation);
    //   setIsInitialStation(false);
    // }else{
    //   handleFinalStation(newStation);
    //   setIsInitialStation(true);
    // }
  }


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
          <Map londonGraph={londonGraph} handleStation={handleStation} path={path}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;

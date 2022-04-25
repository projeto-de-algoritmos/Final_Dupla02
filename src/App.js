import { useState, useEffect } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Map from './components/Map/Map';
import SearchPath from './components/SearchPath/SearchPath';
import { dijkstra } from './algorithm/astar';
import './algorithm/aStarF';
import aStar from './algorithm/aStarF';
import londonUnderground from './imgs/londonUnderground.svg';

const londonGraph = require("./data/londonGraph.json");

function App() {
  const [initialStation, setInitialStation] = useState(0);
  const [finalStation, setFinalStation] = useState(0);
  const [path, setPath] = useState([]);
  const [pathPairs, setPathPairs] = useState([]);


  useEffect(() => {
    const markers = document.querySelectorAll(".markers");

    markers.forEach(el => el.style.stroke="blue")

    markers.forEach(el => el.style.stroke="grey")

    path.forEach(station => {
      markers[station].style.stroke = "red";
      markers[station].style.fill = "red";

    })

    const pairs = [];

    for(let i = 0; i < path.length; i++){
      if(i !== path.length - 1){
        pairs.push([path[i], path[i + 1]]);
      }
    }
    setPathPairs(pairs);
  }, [path]);

  const handleInitialStation = (newStation) => {
    setInitialStation(newStation);
  }

  const handleFinalStation = (newStation) => {
    setFinalStation(newStation);
  }

  const handleSearch = () => {
    try{
      console.log(initialStation);
      console.log(finalStation);


      const answer = dijkstra(initialStation.id, finalStation.id, londonGraph);
      const teste = aStar(initialStation.id, finalStation.id);
      console.log(answer, teste);
      setPath(teste);

    }catch{
      window.alert("Selecione as Estações")
    }
  }
  
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid 
          item xs={3}
        >
          <Grid
            sx={{ width: "100%", height: "100vh" }}
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <img 
              src={londonUnderground} 
              style={{width: "100%", height: "30%"}} 
              alt="Logo London Underground"
            />
            <SearchPath
              londonGraph={londonGraph}
              handleInitialStation={handleInitialStation}
              handleFinalStation={handleFinalStation}
              handleSearch={handleSearch}
            />
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Map londonGraph={londonGraph} path={path} pathPairs={pathPairs}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;

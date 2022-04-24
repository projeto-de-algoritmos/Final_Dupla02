import './App.css';
import Map from './components/Map/Map';

const londonGraph = require("./data/londonGraph.json");

function App() {
  return (
    <Map londonGraph={londonGraph}/>
  );
}

export default App;

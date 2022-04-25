
const londonGraph = require('../data/londonGraph.json');
const NUMBER_STATIONS = 302;

function calcDist(start, end) {
    var lat1 = londonGraph[start].latitude;
    var lon1 = londonGraph[start].longitude;

    var lat2 = londonGraph[end].latitude;
    var lon2 = londonGraph[end].longitude;

    var R = 6371;
    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function createAdjencencyList() {
    let adjencencyList = new Array(NUMBER_STATIONS);

    for (let i = 0; i < NUMBER_STATIONS; i++)
        adjencencyList[i] = []

    for (let i = 0; i < NUMBER_STATIONS; i++) {
        for (let j = 0; j < londonGraph[i].destinations.length; j++) {
            let connection = londonGraph[i].destinations[j].destinationStationId;
            if (!adjencencyList[i].includes(connection)) {
                adjencencyList[i].push(connection);
                adjencencyList[connection].push(i);
            }
        }
    }
    return adjencencyList;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

function calcF(destination, start, end) {
    let h = calcDist(destination, end);
    return h + calcDist(destination, start)
}

function aStar(start, end) {
    let open = [];
    let answer = [];
    let distance = new Array(NUMBER_STATIONS).fill(0);
    let path = new Array(NUMBER_STATIONS).fill(-1);
    const connectedStations = createAdjencencyList();

    let current = start;
    distance[current] = calcDist(current, end);
    open.splice(0, 0, current);

    while (current !== end) {
        for(let i = 0; i < connectedStations[current].length; i++) {
            let destination = connectedStations[current][i]
            if (distance[destination] >= 0) {
                let dist = calcF(destination, current, end);

                if (distance[destination] === 0 || dist < distance[destination]) {
                    distance[destination] = dist;
                    path[destination] = current;

                    if (distance[destination] < distance[open[0]])
                        open.splice(0, 0, destination);
                    else {
                        let j;
                        for (j = 0; j < open.length && distance[open[j]] < distance[destination]; j++);
                        open.splice(j, 0, destination);
                    }
                }
            }
        }
        //console.log(open)
        distance[current] = -1;
        current = open.shift();
    }
    while (path[current] !== -1) {
        answer.unshift(path[current]);
        current = path[current];
    }
    answer.push(end)
    console.log(answer);
    return answer
}


export default aStar;
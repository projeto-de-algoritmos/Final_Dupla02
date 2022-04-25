
function calcDist(start, end, londonGraph) {
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

function createAdjencencyList(londonGraph) {
    let adjencencyList = new Array(302);

    for (let i = 0; i < adjencencyList.length; i++)
        adjencencyList[i] = []

    for (let i = 0; i < adjencencyList.length; i++) {
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

function aStar(start, end, londonGraph) {
    let open = [];
    let distance = new Array(302).fill(0);
    let path = []
    //let path = new Array(302).fill(-1);
    const connectedStations = createAdjencencyList(londonGraph);

    let current = start;
    distance[current] = calcDist(current, end, londonGraph);
    open.splice(0, 0, current);

    while (current !== end) {
        for(let i = 0; i < connectedStations[current].length; i++) {
            let destination = connectedStations[current][i]
            if (distance[destination] >= 0 && !open.includes(destination)) {
                distance[destination] = calcF(destination, start, end);

                if (distance[destination] < distance[open[0]]) {
                    open.splice(0, 0, destination);
                    path.push(current);
                    current = destination;
                }
                else {
                    let j;
                    for (j = 0; j < open.length && distance[open[j]] < distance[destination]; j++);
                    open.splice(j, 0, destination);
                }
            }
        }
        distance[current] = -1;
        current = open.shift();
    }
    console.log(path);
    return(path);
}


export default aStar;
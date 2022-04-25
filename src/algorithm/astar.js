
export const minDistance = (src, dist, paths, queue, graph, visited) => {
    let queue_index;

    for(let i = 0; i < graph[src].destinations.length; i++) {
        let position = graph[src].destinations[i].destinationStationId;
        let cost = graph[src].destinations[i].time;


        if(!visited[position] && dist[src] + cost < dist[position]) {
            //guarda caminho percorrido
            paths[position] = paths[src].slice();
            paths[position].push(position);
            dist[position] = dist[src] + cost;

            //percorre a lista de prio ate achar a posicao certa pra inserir
            for(queue_index = 0; queue.length > 0 &&
                dist[position] >= dist[queue[queue_index]]; queue_index++);

            queue.splice(queue_index, 0, position);    //poe posicao lista de prio
        }
    }

}

export const printOutcome = (end, dist, paths, graph) => {
    // let stops = 'Cidades visitadas: ';
    let stops = [];

    console.log('Soma da distancia percorrida: ' + dist[end]);
    console.log('Caminho percorrido: ' + paths[end]);

    for(let i = 0; i < paths[end].length; i++) {
        // stops += graph[paths[end][i]].name;
        stops.push(graph[paths[end][i]].id);
        // if (i < paths[end].length - 1) {
        //     stops += ' -> ';
        // }
    }
    console.log(stops);

    return stops;
}

// recebe o ponto de partida e o destino
export const dijkstra = (src, end, newGraph) => {
    const size = newGraph.length;
    const dist = new Array(size);           //salva a distancia minima percorrida de cada posicao
    const paths = new Array(size);          //salva o caminho mais barato pra cada posicao
    const visited =  new Array(size);       //Marca se o algoritmo ja testou todos os caminhos da posicao
    const queue = [];                       //Lista de prioridade ordenada pelo menor caminho
    const graph = newGraph;


    // "zera" tudo que precisa zerar
    for(let i = 0; i < size; i++) {
        dist[i] = Number.MAX_VALUE;
        paths[i] = [];
        visited[i] = false;
    }

    paths[src].push(src);
    dist[src] = 0;
    queue.push(graph[src]);

    while(!visited[end]) {
        minDistance(src, dist, paths, queue, graph, visited);
        visited[src] = true;
        src = queue[0];
        queue.shift();
    }

    return printOutcome(end, dist, paths, graph);
}

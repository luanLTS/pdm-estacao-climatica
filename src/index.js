import React from 'react';
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    constructor(props) {
        // recebe os props e passa para a classe pai (React.Component)
        super(props);
        // inicia o estato do componente com os valores desejados
        this.state = {
            latitude: null,
            longitude: null,
            estacao: null,
            data: null,
            icone: null
        }
    }

    obterEstacao = (data, latitude) => {
        const anoAtual = data.getFullYear();
        // new Date(ano, 0 ate 11, dia)
        const d1 = new Date(anoAtual, 5, 21);
        const d2 = new Date(anoAtual, 8, 24);
        const d3 = new Date(anoAtual, 11, 22)
        const d4 = new Date(anoAtual, 2, 21);
        const sul = latitude < 0;
        if(data >= d1 && data < d2) 
            return sul ? 'Inverno' : 'Verão';
        if(data >= d2 && data < d3) 
            return sul ? 'Primavera' : 'Outono';
        if(data >= d3 && data < d4) 
            return sul ? 'Verão' : 'Inverno';
        return sul ? 'Outono' : 'Primavera'
    }

    render(){
        return (
            <div>
                meu app
            </div>
        )
    }
}


ReactDOM.createRoot(document.getElementById("root")).render(<App />)

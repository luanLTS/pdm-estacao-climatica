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
            icone: null,
            mensagemErro: null
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

    // mapeamendo dos icones para cada estação
    icones = {
        'Primavera': 'fa-seedling',
        'Verão': 'fa-umbrella-beach',
        'Outono': 'fa-tree',
        'Inverno': 'fa-snowman'
    }

    obterLocalizacao = () => {
        window.navigator.geolocation.getCurrentPosition(
            // callback
            (posicao) => {
                let data = new Date(); // pega a data atual quando não passa parametros
                let {latitude, longitude }  = posicao.coords;
                let estacao = this.obterEstacao(data, latitude);
                let icone = this.icones[estacao];
                console.log(icone);
                this.setState({
                    latitude,
                    longitude,
                    estacao,
                    icone,
                    data: data.toLocaleString(),
                })
            },
            (err) => {
                console.log(err);
                this.setState({mensagemErro: 'Tent novamente mais tarde'});
            }
        )
    }

    render(){
        return (
            <div className='container mt-2'>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center border rounded mb-2" style={{height: '6rem'}}>
                                    <i className={`fas fa-5x ${this.state.icone}`}></i>
                                    <p className='w-75 ms-3 text-center fs-1'>{this.state.estacao}</p>

                                </div>
                            <div className="">
                                <p className="text-center">
                                    {
                                        this.state.latitude?
                                            `Coordenadas: ${this.state.latitude}, ${this.state.longitude}. Data: ${this.state.data}`
                                        :
                                            this.state.mensagemErro?
                                                `${this.state.mensagemErro}`:
                                                    `Clique no botão para saber a sua estação climática`
                                    }
                                </p>
                            </div>
                            <button type="button" className="btn btn-outline-success w-100 mt-2" onClick={this.obterLocalizacao}>Qual é a minha estação</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


ReactDOM.createRoot(document.getElementById("root")).render(<App />)

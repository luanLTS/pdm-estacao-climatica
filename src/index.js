import React from 'react';
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import { EstacaoClimatica } from './components/EstacaoClimatica';
import { Loading } from './components/Loading';

class App extends React.Component {
    constructor(props) {
        // recebe os props e passa para a classe pai (React.Component)
        super(props);
        // inicia o estato do componente com os valores desejados
        // this.state = {
        //     latitude: null,
        //     longitude: null,
        //     estacao: null,
        //     data: null,
        //     icone: null,
        //     mensagemErro: null
        // }
        // console.log("construtor");
    }

    state = {
        latitude: null,
        longitude: null,
        estacao: null,
        data: null,
        icone: null,
        mensagemErro: null
    }

    componentDidMount() {
        this.obterLocalizacao();
    };

    // componentDidUpdate() {
    //     console.log("componente update");
    // };

    // componentWillUnmount() {
    //     console.log("componente unmount");
    // };



    obterEstacao = (data, latitude) => {
        const anoAtual = data.getFullYear();
        // new Date(ano, 0 ate 11, dia)
        const d1 = new Date(anoAtual, 5, 21);
        const d2 = new Date(anoAtual, 8, 24);
        const d3 = new Date(anoAtual, 11, 22)
        const d4 = new Date(anoAtual, 2, 21);
        const sul = latitude < 0;
        if (data >= d1 && data < d2)
            return sul ? 'Inverno' : 'Verão';
        if (data >= d2 && data < d3)
            return sul ? 'Primavera' : 'Outono';
        if (data >= d3 && data < d4)
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
                let { latitude, longitude } = posicao.coords;
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
                this.setState({ mensagemErro: 'Tent novamente mais tarde' });
            }
        )
    }

    render() {
        // console.log("render")
        return (
            <div className='container mt-2'>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {
                            !this.state.latitude && !this.state.mensagemErro ?
                                <Loading
                                    textLoading="Por favor, responda à solicitacção de localização."
                                /> :
                                this.state.mensagemErro ?
                                    <p className='border rounded p-2 fs-1 texte-center'>
                                        É preciso dar permissão para acesso à localização.
                                        Atualize a página e tente de novo, ajustando a configuração do seu navegador.
                                    </p>
                                    :
                                    <EstacaoClimatica
                                        icone={this.state.icone}
                                        estacao={this.state.estacao}
                                        latitude={this.state.latitude}
                                        longitude={this.state.longitude}
                                        obterLocalizacao={this.obterLocalizacao}
                                    />
                        }
                    </div>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById("root")
)

// ReactDOM.createRoot().render()

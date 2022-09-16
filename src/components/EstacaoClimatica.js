import React from 'react';

export class EstacaoClimatica extends React.Component {

    timer = null;

    state = {
        data: null
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                data: new Date().toLocaleString(),
            })
        }, 1000);
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center border rounded mb-2" style={{ height: '6rem' }}>
                        <i className={`fas fa-5x ${this.props.icone}`}></i>
                        <p className='w-75 ms-3 text-center fs-1'>{this.props.estacao}</p>

                    </div>
                    <div className="">
                        <p className="text-center">
                            {
                                this.props.latitude ?
                                    `Coordenadas: ${this.props.latitude}, ${this.props.longitude}. Data: ${this.state.data}`
                                    :
                                    this.props.mensagemErro ?
                                        `${this.props.mensagemErro}` :
                                        `Clique no botão para saber a sua estação climática`
                            }
                        </p>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-success w-100 mt-2"
                        onClick={this.props.obterLocalizacao}
                    >
                        Qual é a minha estação
                    </button>
                </div>
            </div>
        )
    }
};
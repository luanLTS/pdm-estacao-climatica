import { Component } from "react";

export class Loading extends Component {
    render() {
        return <div className="d-flex flex-column justify-content-center align-items-center border rounded p-3">
            <div
                style={{
                    width: '3rem',
                    height: '3rem'
                }}
                className="spinner-border text-secoundary"
            >
                <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="text-secoundary mt-4">{this.props.textLoading}</p>
        </div>
    }
}

Loading.defaultProps = {
    textLoading: "Carregando..."
}
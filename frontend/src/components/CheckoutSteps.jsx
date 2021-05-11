import React from 'react';
import './styles/CheckoutSteps.css'
export default function CheckoutSteps(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active' : ''}>Iniciar Sesión</div>
            <div className={props.step2 ? 'active' : ''}>Envío</div>
            <div className={props.step3 ? 'active' : ''}>Método de Pago</div>
            <div className={props.step4 ? 'active' : ''}>Crear Orden</div>
        </div>
    );
}

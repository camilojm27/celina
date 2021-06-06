export default function CheckoutSteps(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'steps-active' : ''}>Iniciar Sesión</div>
            <div className={props.step2 ? 'steps-active' : ''}>Envío</div>
            <div className={props.step3 ? 'steps-active' : ''}>Método de Pago</div>
            <div className={props.step4 ? 'steps-active' : ''}>Crear Orden</div>
        </div>
    );
}

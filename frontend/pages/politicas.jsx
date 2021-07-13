import Image from 'next/image'
import svg from '../public/undraw_contact_us_15o2.svg'

export default function Contacto() {
    return (
        <section>
            <h2>Políticas de Envios</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias eligendi fuga ipsum obcaecati odio
                quia reiciendis similique vel voluptates!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias eligendi fuga ipsum obcaecati odio
                quia reiciendis similique vel voluptates!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias eligendi fuga ipsum obcaecati odio
                quia reiciendis similique vel voluptates!
            </p>
            <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, commodi!</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, commodi!</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, commodi!</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, commodi!</li>
            </ul>
            <style jsx>{`
              section {
                width: 80%;
                margin: auto;
              }

              li {
                font-size: 16px;
              }

            `}</style>
        </section>
    )
}

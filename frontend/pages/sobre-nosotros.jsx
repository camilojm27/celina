import Image from 'next/image'
import svg from '../public/undraw_contact_us_15o2.svg'

export default function SobreNosotros() {
    return (
        <section>
            <div>
                <h1>Sobre nosotros</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolore doloremque
                    exercitationem, laudantium nesciunt quisquam repellat. Amet aspernatur commodi consequatur corporis
                    ducimus earum est perspiciatis, possimus saepe sunt vel.</p>
            </div>
            <Image src={svg} alt=""/>
            <Image src={svg} alt=""/>
            <div>
                <h1>Sobre nosotros</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa dolore doloremque
                    exercitationem, laudantium nesciunt quisquam repellat. Amet aspernatur commodi consequatur corporis
                    ducimus earum est perspiciatis, possimus saepe sunt vel.</p>
            </div>
            <style jsx>{`
              section {
                display: grid;
                grid-template-columns: 1fr 2fr;
                padding: 20px;
                grid-gap: 20px;
              }

              div {
                align-self: center;
                letter-spacing: 1px;
              }

              @media screen and (max-width: 700px) {
                section {
                  grid-template-columns: 1fr;
                  grid-template-rows: 1fr;
                }

              }
            `}</style>
        </section>
    )
}

import {useEffect} from "react";
import {useForm} from "react-hook-form";
import Auth from "../firebase/auth";
import {useDispatch} from "react-redux";
import {signing} from "../redux/actions/userActions";
import Link from "next/link";
import {useRouter} from "next/router";
import {useAuth} from "../firebase/authHooks";


export default function Login() {

    const router = useRouter()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const redirect = router.query.redirect
        ? router.query.redirect
        : '/';
    console.log('query', router.query)
    console.log('redirect ',redirect)

    const { user } = useAuth();



    useEffect(() => {
        if (user) {
            router.push(redirect);
        }
    }, [redirect, user]);

    async function onSubmit(data) {
        try{
            const {email, password} = data
            let user = await Auth.loginWithEmail(email, password)
            console.info(user)
            dispatch(signing(user))
        }catch (e) {

        }


    }

    async function handleGoogle() {
        try{
           const userCredential = await Auth.loginWithGoogle()
            dispatch(signing(userCredential))
            setTimeout(() => {
                //router.push('/')
            }, 1500)
        }
        catch (e) {

        }


    }

    return (
        <section className="register">
            <div className="wrapper">
                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h1>Iniciar sesión</h1>
                    </div>

                    <div>
                        <label htmlFor="email">Correo Electronico</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="correo@celina.com"
                            required
                            ref={register}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Ingrese su Contraseña"
                            required
                            ref={register}

                        />
                    </div>

                    <div>
                        <label/>
                        <button className="button-action" type="submit">
                            Ingresar
                        </button>
                    </div>

                </form>
                <div className="button-action google" onClick={handleGoogle}>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/celina-tienda.appspot.com/o/assets%2Fgoogle_48px.png?alt=media&token=87bc4216-6b62-4411-a826-026fe951f23d"
                        alt="icono de google"/>
                    <p>Iniciar Sesión con google</p>
                </div>
                <p>¿No tienes cuenta? <Link href="/register">Registrate</Link></p>
            </div>
        </section>
    )
}



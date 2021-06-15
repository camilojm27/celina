import { Provider } from 'react-redux'
import { useStore } from '../store'
import '../styles.css'
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout'
import {ToastContainer} from "react-toastify";
import {AuthProvider} from '../firebase/authHooks'

export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)



    return (            
        <Provider store={store}>
            <AuthProvider>
                <ToastContainer position="top-center"
                                style={{ fontSize: "24px" }} />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </Provider>
    )
}


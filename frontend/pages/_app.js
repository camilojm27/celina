import { Provider } from 'react-redux'
import { useStore } from '../store'
import '../styles.css'
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout'
import {ToastContainer} from "react-toastify";
import React from "react";
export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)

    return (            
        <Provider store={store}>
            <Layout>
                    <Component {...pageProps} />
            </Layout>
            <ToastContainer position="top-center"
                            style={{ fontSize: "24px" }} />
        </Provider>
    )
}

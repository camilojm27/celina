import { Provider } from 'react-redux'
import { useStore } from '../store'
import '../styles.css'
import Layout from '../components/Layout'
export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)

    return (            
        <Provider store={store}>
            <Layout>
                    <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}

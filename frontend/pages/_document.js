import Document, { Html, Head, Main, NextScript } from 'next/document'
import {ToastContainer} from "react-toastify";
import React from "react";


class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Farsan&display=swap" rel="stylesheet"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
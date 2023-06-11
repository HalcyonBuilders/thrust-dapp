import type { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";

import Loading from "../components/Thrust/Utils/Loading";
import "../styles/globals.css";

const WalletKitProvider = dynamic(() => import("@mysten/wallet-kit").then((mod) => mod.WalletKitProvider), {
    ssr: false,
    loading: Loading,
});

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <title>tHrust</title>
            </Head>
            <WalletKitProvider>
                <Component {...pageProps} />
            </WalletKitProvider>
        </>
    );
};

export default App;

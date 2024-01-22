import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { AuthCoreContextProvider, PromptSettingType } from '@particle-network/auth-core-modal';
import { AvalancheTestnet } from '@particle-network/chains';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthCoreContextProvider
        options={{
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
            clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
            appId: process.env.NEXT_PUBLIC_APP_ID as string,
            themeType: 'dark',  //light or dark
            fiatCoin: 'USD',
            language: 'en',
            promptSettingConfig: {
              promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
              promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
          },
          erc4337: {
            name: 'BICONOMY',
            version: '2.0.0',
          },
          wallet: {
              visible: true,  //show wallet entrance when connect success.
              preload: true,
              customStyle: {
                  supportChains: [AvalancheTestnet],
              },
          },
        }}
        >
            <Component {...pageProps} />
        </AuthCoreContextProvider>
    );
}

export default MyApp;

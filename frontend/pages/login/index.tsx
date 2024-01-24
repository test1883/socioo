import type { NextPage } from 'next';
import { useEffect } from 'react';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

import { useConnect, useEthereum } from '@particle-network/auth-core-modal';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { AvalancheTestnet } from '@particle-network/chains';
import Web3 from 'web3';

const Login: NextPage = () => {
    const { connect, disconnect, connectionStatus } = useConnect();

    const { address, provider } = useEthereum();

    useEffect(() => {
        if (provider && !window.smartAccount) {
            setUpSmartAccount()
        }
    }, [provider])

    useEffect(() => {
        if (address) {
            (async function () {
                const address = await window.smartAccount.getAddress();
                console.log(address)
            })()
        }
    }, [address])

    const setUpSmartAccount = async () => {
        window.smartAccount = new SmartAccount(provider, {
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
            clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
            appId: process.env.NEXT_PUBLIC_APP_ID as string,
            aaOptions: {
                accountContracts: {
                    BICONOMY: [
                        {
                            version: '2.0.0',
                            chainIds: [43113],
                        }
                    ],
                },
                paymasterApiKeys: [{
                    chainId: 43113,
                    apiKey: process.env.NEXT_PUBLIC_PAYMASTER_FUJI as string,
                }]
            },
        });
        window.web3 = new Web3(new AAWrapProvider(window.smartAccount, SendTransactionMode.UserSelect) as any);
        window.smartAccount.setSmartAccountContract({ name: 'BICONOMY', version: '2.0.0' });
        
    }

    const handleConnect = async () => {
        try {
            await connect({
                chain: {
                    id: AvalancheTestnet.id, 
                    name: AvalancheTestnet.name
                }
            });

        } catch (error) {
            console.log(error);
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnect();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.container}>

            <main className={styles.main}>
                {connectionStatus !== 'connected' && (
                    <>
                        <button className={styles.btn} onClick={handleConnect}>
                            {connectionStatus === 'disconnected' ? 'CONNECT' : connectionStatus.toUpperCase()}
                        </button>
                    </>
                )}

                {connectionStatus === 'connected' && (
                    <>
                        <button className={styles.btn} onClick={handleDisconnect}>
                            DISCONNECT
                        </button>
                    </>
                )}

                <h1 className={styles.title}>
                    Welcome to <a href="https://particle.network">Particle Network!</a>
                </h1>

                <p className={styles.description}>
                    Get started by editing <code className={styles.code}>pages/index.tsx</code>
                </p>

                <div className={styles.grid}>
                    <a href="https://docs.particle.network" className={styles.card}>
                        <h2>Documentation &rarr;</h2>
                        <p>Find in-depth information about AuthCore features and API.</p>
                    </a>

                    <a href="https://dashboard.particle.network" className={styles.card}>
                        <h2>Dashboard &rarr;</h2>
                        <p>Manage your projects and team, View analytics data, Custom configuration.</p>
                    </a>

                    <a href="https://github.com/Particle-Network/particle-web-auth-core" className={styles.card}>
                        <h2>Examples &rarr;</h2>
                        <p>Discover and deploy boilerplate example AuthCore projects.</p>
                    </a>

                    <a href="https://particle.network" className={styles.card}>
                        <h2>Website &rarr;</h2>
                        <p>Particle Network, The Intent-Centric Modular Access Layer of Web3.</p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <span className={styles.logo}>
                    <Image src="/footer_img.png" alt="Particle Logo" width={240} height={24} />
                </span>
            </footer>
        </div>
    );
};

export default Login;

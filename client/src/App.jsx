//import components
import Homepage from "./components/homepage/Homepage";
import CreatePostForm from "./components/create-post-form/Form";
import AboutPage from "./components/about-page/AboutPage";
import DisplayArticle from "./components/display-article/DisplayArticle";
import ContactPage from "./components/contact-us/ContactPage";
import DashboardPage from "./components/dashboard/DashboardPage";
import RootLayout from "./layouts/RootLayout";
import ProfilePage from "./components/dashboard/pages/profile/ProfilePage";
import MyArticlesPage from "./components/dashboard/pages/my-articles/MyArticlesPage";
import BookmarkedArticlesPage from "./components/dashboard/pages/bookmarked-articles/BookmarkedArticlesPage";
import MyWalletsPage from "./components/dashboard/pages/my-wallets/MyWalletsPage";
import SettingsPage from "./components/dashboard/pages/settings/SettingsPage";
import DonatePage from "./components/donate-page/DonatePage";

//import libraries
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { useState,useEffect } from "react";
import { ethers } from "ethers";

//import contract
import abi from './contracts/Post.json';

export default function App() {

    //========== WALLET CONNECT ==========//

    const [WalletState, setWalletState] = useState({
        provider: null,
        signer: null,
        contract: null
    })

    useEffect(() => {
        const connectWallet = async() => {

            const contractAddress = "0x9Be91911c115b7015c6A774B2545Da9463040523";
            const contractABI = abi.abi;

            try {
                //get metamask injected object in browser window
                const {ethereum} = window; 

                //some metamask code
                if(ethereum) {
                    // eslint-disable-next-line
                    const account = await ethereum.request({method: "eth_requestAccounts"});
                    // reload window if user changes chain
                    window.ethereum.on("chainChanged", ()=>{
                        window.location.reload();
                    });

                    // reload windows if user changes account
                    window.ethereum.on("accountsChanged", ()=>{
                        window.location.reload();
                    });
                    
                    // get signer and provider
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();

                    // gets chainId of the current network and prompts user to change to mumbai if not correct
                    const { chainId } = await provider.getNetwork();
                    if (chainId !== 80001) {
                        window.alert("Please switch to Mumbai Testnet");
                        throw new Error("Change network to Mumbai Testnet");
                    }

                    //contract instance
                    const contract = new ethers.Contract(contractAddress, contractABI, signer);

                    //set wallet state
                    setWalletState({provider, signer, contract});
                } else {
                    alert("Please install Metamask");
                    window.open("https://metamask.io/download", "_blank");
                }
            } catch(error) {
                console.log(error);
            }
        };

        //call connect wallet 
        connectWallet();

    },[]/*empty dependency*/);

    //console.log(WalletState);

    //========== WALLET CONNECT END ==========//


    const router = createBrowserRouter(
        createRoutesFromElements (
            <Route path="/" element={<RootLayout />} >
                <Route index element={<Homepage WalletState={WalletState} />} />
                <Route path="about" element={<AboutPage />}/>
                <Route path="create-post" element={<CreatePostForm WalletState={WalletState} />} />
                <Route path=":Id" element={<DisplayArticle WalletState={WalletState} />} />
                <Route path="contact-us" element={<ContactPage />} />
                <Route path="dashboard" element={<DashboardPage />} >
                    <Route index element={<ProfilePage WalletState={WalletState} />} />
                    <Route path="my-articles" element={<MyArticlesPage WalletState={WalletState} />} />
                    <Route path="bookmarked" element={<BookmarkedArticlesPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="my-wallets" element={<MyWalletsPage />} />
                </Route>
                <Route path="donate" element={<DonatePage WalletState={WalletState} />} />
            </Route>
        )
    )

    //========== APP RETURN ==========//
    
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );

    //========== APP RETURN END ==========//
} 
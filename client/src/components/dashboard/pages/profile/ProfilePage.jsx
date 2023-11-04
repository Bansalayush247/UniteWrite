// import css file 
import "./styles.css"

import { useState, useEffect } from "react";

import image from "./metamask-logo.jpg";

export default function ProfilePage(props) {

    const { provider, signer, contract } = props.WalletState;
    const [walletAddress, setWalletAddress] = useState("");

    useEffect(() => {
        if (signer) {
            const getAddress = async () => {
                const address = await signer.getAddress();
                setWalletAddress(address);
            };
            getAddress();
        }
    }, [signer]);

    return (
        <div className="profile-page-container">
            <div className="profile-page-heading-container">
                <h1>| Profile Page |</h1>
            </div>
            <hr />
            {contract && signer && provider ?
                <div className="profile-account-container">
                    <img src={image} alt="" width="100px" height="100px" />
                    <div className="profile-account-container-div">
                        <h2 className="profile-account-container-div-heading">CONNECTED</h2>
                        <h5 className="profile-account-container-div-content">Wallet:  <span>Metamask</span></h5>
                        <h5 className="profile-account-container-div-content">Wallet Address:  <span>{walletAddress}</span></h5>
                    </div>
                </div> :

                <div>NOT CONNECTED</div>}
        </div>
    )
}

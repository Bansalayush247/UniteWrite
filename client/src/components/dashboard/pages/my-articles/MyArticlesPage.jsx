import AuthorArticlesListItem from "./AuthorArticlesListItem";

import { useEffect, useState } from "react";

import "./styles.css";

export default function MyArticlesPage(props) {

    const {contract, signer} = props.WalletState;

    const [authorArticleIds, setAuthorArticleIds] = useState([]);
    const [authorAddress, setAuthorAddress] = useState(null);

    useEffect(() => {
        const getAuthorAddress = async () => {
            if (signer) {
                try {
                    const _authorAddress = await signer.getAddress();
                    setAuthorAddress(_authorAddress);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getAuthorAddress();
    }, [signer]);

    useEffect(() => {
        const getAuthorArticleIds = async() => {
            if (authorAddress) {
                const _authorArticleIds = await contract.getAuthorArticleIds(authorAddress);
                setAuthorArticleIds(_authorArticleIds.map((id) => id.toString()));
            }
        }

        getAuthorArticleIds();
    }, [authorAddress, contract]);

    return (
        <div className="my-articles-container">
            <div className="my-articles-heading-container">
                <h1>| My Articles |</h1>
            </div>
            <hr/>
            {authorArticleIds.map((id) => {
                return (
                    <AuthorArticlesListItem key={id} articleId={id} contract={contract} />
                )
            })}
        </div>
    );
}

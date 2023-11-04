//import components
import HomepageCarousel from "./carousel/Carousel";
import SearchBar from "./search-bar/SearchBar";
import CreatePostButton from "./buttons/CreatePostButton";
import DashboardButton from "./buttons/DashboardButton";
import ArticleCard from "./card/Card";

//import bootstrap components
import Spinner from "react-bootstrap/Spinner";

//import libraries
import { useEffect, useState } from "react";

//import css file
import './styles.css';

export default function Homepage(props) {

    const {contract} = props.WalletState;

    //============== RECENT ARTICLES ==============//
   
    const [latestPostId, setLatestPostId] = useState();
    const [recentArticles, setRecentArticles] = useState([]);
    const [recentArticlesState, setRecentArticlesState] = useState("fetching");
    const [recentArticlesIDs] = useState([]);

    var IDListIndex = -1;
  
    useEffect(() => {

        // get latest post Id
        const getLatestPostId = async() => {
            const _latestPostId = await contract.postId();
            setLatestPostId(_latestPostId.toNumber());
        }
        if (contract) {
            getLatestPostId();
        }
        
        // get all recent articles
        if (latestPostId) {
            const getAllRecentArticles = async() => {
                let recentArticlesList = [];
                for(let i = 1; i <= latestPostId; i++) {
                    const _post = await contract.getPost(i);
                    if (_post.timestamp != 0) {
                        recentArticlesIDs.push(i);
                        recentArticlesList.push(_post);
                    }
                }
                setRecentArticles(recentArticlesList);
                if (recentArticlesList.length != 0) {
                    setRecentArticlesState("fetched");
                }
            }
            getAllRecentArticles();
        }
  
    });

    //============== RECENT ARTICLES END ==============//

    return (
        <div className="homepage-container">
            <div className="carousel-container">
                <HomepageCarousel />
                <SearchBar />
                <div className="homepage-carousel-button-container">
                    <CreatePostButton />
                    <DashboardButton />
                </div>
                <h3 className="-articles-headingrecent">Recent Articles</h3>
                <hr className="solid-divider" />
                
                {/* display recent article cards */}
                <div className="recent-article-cards-container">
                    {recentArticlesState === "fetched" ? recentArticles.map((article) => {

                        IDListIndex++;

                        return(
                            <ArticleCard key={article.timestamp} article={article} Id = {recentArticlesIDs[IDListIndex]} />
                        )
                     }) : <Spinner animation="border" variant="success" className="homepage-spinner" />}
                </div>
            </div>
        </div>
    );
}
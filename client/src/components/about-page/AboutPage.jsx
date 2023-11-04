
// import css file
import './styles.css';

export default function AboutPage() {

    return(
        <div className="about-page-container">
            <h1 style={{fontWeight: "bold"}}>About</h1>
            <br/>
            <p style={{color: "black"}}>
                UniteWrite is a revolutionary news sharing and journaling application designed to provide a platform for independent journalists, news agencies, and individuals to post news and other updates anonymously on the blockchain. Our primary goal is to enable free and unbiased sharing of information without any fear of censorship or retribution from any government or private organization.
            </p>
            <p style={{color: "black"}}>
                The current media landscape is plagued by corruption, censorship, and bias. UniteWrite aims to address these issues by leveraging the power of blockchain technology and implementing smart contracts and IPFS. With this approach, we can ensure that no individual or organization has control over the data, and anyone can safely post any news or information they desire without worrying about it being taken down or manipulated.
            </p>
            <p style={{color: "black"}}>
                We believe in the responsible sharing of information, and our platform is designed to enable this in a decentralized and secure manner. We provide a solution to the problem of corrupt media and censorship by creating an open and transparent environment for the exchange of ideas and information. We believe that this approach will lead to a more informed and empowered society that is better equipped to make important decisions.
            </p>
        </div>
    );
}
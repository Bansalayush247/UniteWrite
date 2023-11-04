import search_icon from '../resources/search_icon.png';

export default function SearchBar() {
    
    return (
        <div className="search-bar-container">
            <input type="text" placeholder="Search article...." />
            <button type="submit" className="gradient"><img src={search_icon} alt="Submit" /></button>
        </div>
    );
}
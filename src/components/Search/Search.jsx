import './Search.css'

const Search = ({handleInput}) => {


    return (
        <div className="search__container">
            <input className="search__input" type="text" placeholder="Search games" onChange={handleInput}/>
        </div>
    );
};

export default Search;
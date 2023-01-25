import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Select from "../Select/Select";
import styles from './Nav.module.css';

export default function Nav({onSearch, clearFilter, changeOrderBreeds, order, switchModal}) {
    const search = useSelector(state=>state.filtered.isFiltered);
    return(
        <nav className={styles.nav}>
        <Link to="/home">
            <label><b>Dogs information</b></label>
        </Link>
        <label className={styles.menuButton} htmlFor="toggler"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg></label>
        <input className={styles.check} type="checkbox" id="toggler" />
            <div className={styles.menu}>
                <div className={styles.list}>
                    <button disabled={search} className={styles.buttonModal} onClick={switchModal}>Filters</button>
                    <Select changeOrderBreeds={changeOrderBreeds} order={order} />
                    <SearchBar onSearch={onSearch} clearFilter={clearFilter}/>
                    <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                    </Link>
                </div>
            </div>
    </nav>
    )
}
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Select from "../Select/Select";
import styles from './Nav.module.css';
import logOut from '../../icons/logOut2.svg';
import logo from '../../images/dog.png';

export default function Nav({onSearch, clearFilter, changeOrderBreeds, order, switchModal}) {
    const search = useSelector(state=>state.filtered.isFiltered);
    const {pathname} = useLocation();
    return(
        <nav className={styles.nav}>
        <Link to="/home">
        <img className={styles.logo} src={logo} alt="" />
            {/* <label><b>Dogs information</b></label> */}
        </Link>
        <label className={styles.menuButton} htmlFor="toggler"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg></label>
        <input className={styles.check} type="checkbox" id="toggler" />
            <div className={styles.menu}>
                <div className={styles.list}>
                    <div className={styles.divLabel}>
                        <Link to="/create" style={{textDecoration:'none'}}><label className={styles.labelCreate}>Create breed</label></Link>
                    </div>
                    {pathname!=='/home'?'':<button disabled={search} className={styles.buttonModal} onClick={switchModal}>Filters</button>}
                    {pathname!=='/home'?'':<Select changeOrderBreeds={changeOrderBreeds} order={order} />}
                    {pathname!=='/home'?'':<SearchBar onSearch={onSearch} clearFilter={clearFilter}/>}
                    <Link to="/" style={{textDecoration:'none'}}>
                        <img className={styles.logOut} src={logOut} alt="" />
                        {/* <label className={styles.logOut}>LogOut</label> */}
                    </Link>
                </div>
            </div>
    </nav>
    )
}
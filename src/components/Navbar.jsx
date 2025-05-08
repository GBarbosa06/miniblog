import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';

import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

const Navbar = () => {

    const {user} = useAuthValue();

    const { logout } = useAuthentication();
    
  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.logo}>
            Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : undefined)}>
                    Home
                </NavLink>
            </li>
            {!user && 
                <>
                <li>
                    <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : undefined)}>
                        Entrar
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : undefined)}>
                        Registrar
                    </NavLink>
                </li>
                </>
            }
            {user && 
                <>
                <li>
                    <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : undefined)}>
                        Novo post
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : undefined)}>
                        Dashboard
                    </NavLink>
                </li>
                </>
            }
            <li>
                <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : undefined)}>
                    Sobre
                </NavLink>
            </li>
            {user && (
                <li>
                    <a onClick={logout}>Sair</a>
                </li>
            )}
        </ul>
    </nav>
  )
}

export default Navbar
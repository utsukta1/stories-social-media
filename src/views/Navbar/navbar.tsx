import { NavLink, Outlet } from "react-router-dom";
import './navbar.css'


function Navbar() {
    return (
        <>

            <div className="nav">
                <div className='profile'>
                    <i className="fas fa-user"></i>
                    <div className='name'>Utsukta Parajuli</div>
                    <div className='username'>@utsuktapi</div>
                </div>
                <div className="links-download"><div className='links'>
                    <NavLink to={'/'}>Feed</NavLink>
                    <NavLink to={'/profile'}>Profile</NavLink>
                </div>
                    <div className='download'>Download our app</div></div>


                <main><Outlet /></main>

            </div>





        </>
    )
}
export default Navbar;
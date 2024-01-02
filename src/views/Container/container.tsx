import Navbar from "#views/Navbar/navbar";
import { ReactNode } from "react";
import './container.css'
import Sidebar from "#views/Sidebar/sidebar";

interface ContainerInterface {
    children: ReactNode,
}
function Container({ children }: ContainerInterface) {
    return (<>

        <div className="container-content">

            <div className="nav-bar"><Navbar /></div>



            <div className="feed-inp">

                <div className="feed">{children}</div>
            </div>

            <div className="side">
                <Sidebar />
            </div>




        </div>

    </>)
}
export default Container;
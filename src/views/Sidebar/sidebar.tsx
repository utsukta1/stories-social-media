// import Button from '#views/Button/button';
import './sidebar.css'

function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <div className="suggestions">
                    <h3>People you may know</h3>

                    <ul className='suggested-list'>
                        <li className='suggested-name'>Fereeca Tuladhar
                        </li>
                        <li className='suggested-name'>Roshani Paudel </li>
                        <li className='suggested-name'>Ujjwal Dhakal </li>

                    </ul>
                </div>
                <div className="recommended">
                    <h3>Recommended</h3>

                    <ul>
                        <li>Recommendation 1</li>
                        <li>Recommendation 2</li>

                    </ul>
                </div>
            </div>

        </>
    )
}

export default Sidebar;
import Container from "#views/Container/container"
import './profile.css'

function Profile() {
    return (
        <Container>
            <div className="profile-cover">

            </div>
            <div className='profile-page'>
                <i className="fas fa-user"></i>
                <div className='location-page'>Lalitpur,Nepal</div>
                <div className='name-page'>Utsukta Parajuli</div>
                <div className='username-page'>@utsuktapi</div>
            </div>
        </Container>

    )
}

export default Profile
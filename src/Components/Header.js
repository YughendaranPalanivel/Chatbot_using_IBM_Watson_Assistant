import './Header.css';
import logo from '../image.jpeg';

const Header = () => {
    return(
        <header className="chatbot__header">
            <div className="chatbot__logo">
                <img src = {logo} alt="logo" widht= "40px" height = "40px"/>
            </div>
            <div className="chatbot__info">
                <div className="chatbot__name">Alexandra</div>
                <div className="chatbot__state">Online</div>
            </div>
        </header>
    );
}

export default Header;
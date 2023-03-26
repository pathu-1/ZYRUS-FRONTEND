import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa"
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <>
            <div className="footer_wrapper">
                <div className="footer_icons">
                    <FaFacebookF size={25} className="footer_icon" />
                    <FaInstagram size={25} className="footer_icon" />
                    <FaLinkedinIn size={25} className="footer_icon" />
                    <FaTwitter size={25} className="footer_icon" />
                </div>
                <div className="footer_links">
                    <div className="footer_link_row">
                        <Link to="/" className="footer_link">home</Link>
                        <Link to="/"  className="footer_link">tv shows</Link>
                        <Link to="/"  className="footer_link">movies</Link>
                    </div>
                    <div className="footer_link_row">
                        <Link to="/" className="footer_link">made with</Link>
                        <Link to="/"  className="footer_link">help center</Link>
                        <Link to="/"  className="footer_link">terms of use</Link>
                    </div>
                    <div className="footer_link_row">
                        <Link to="/" className="footer_link">privacy</Link>
                        <Link to="/"  className="footer_link">contact us</Link>
                        <Link to="/"  className="footer_link">corporate information</Link>
                    </div>
                    <div className="footer_link_row">
                        <Link to="/" className="footer_link">my website</Link>
                        <Link to="/"  className="footer_link">work with me</Link>
                        <Link to="/"  className="footer_link">copyright policy</Link>
                    </div>
                </div>
                <div className="created_by">
                        created by <Link to="/" className="created_by_link">prathamesh khochade</Link> @2023 all rights reserved
                </div>
            </div>
        </>
    )
}

export default Footer;
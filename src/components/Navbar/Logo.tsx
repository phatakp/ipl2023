import { Link } from "react-router-dom";

export const Logo = () => {
    return (
        <Link to="/" className="flex items-center">
            <img
                src={`${process.env.REACT_APP_IMAGE_URL}/ipl-logo.png`}
                className="w-18 mr-3 h-12 "
                alt="IPL Logo"
            />
        </Link>
    );
};

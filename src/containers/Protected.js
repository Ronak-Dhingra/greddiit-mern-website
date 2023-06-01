import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate} from "react-router-dom";

// const Protected = ({ isLoggedIn, children }) => {
function Protected ({children}) {
    const navigate = useNavigate();

    
    // if (isLoggedIn === 'false' || isLoggedIn === null) {
        
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('token');
        if (!isLoggedIn) {
            console.log("not logged in")
            navigate("/");
        }
    }, []);


    return children;
};
export default Protected;
import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children, allowedRoles }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkUserAuthorization = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/check-session`,
          {
            withCredentials: true,
          }
        );
        const user = response.data.user;
        if (response.data.loggedIn && allowedRoles.includes(user.role)) {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error(
          "There was an error checking the user's authorization!",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAuthorization();
  }, [allowedRoles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/" />;
};

export default PrivateRoute;

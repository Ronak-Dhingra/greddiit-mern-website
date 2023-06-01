import React, { useState } from "react";

export const CommonState = () => {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    return (
        <div>
            <Login isLoggedOut={isLoggedOut} setIsLoggedOut={setIsLoggedOut} />
            <Logout isLoggedOut={isLoggedOut} setIsLoggedOut={setIsLoggedOut} />
        </div>
    );
};
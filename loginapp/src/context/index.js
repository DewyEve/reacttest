import React from "react";
// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!

export const UserContext = React.createContext({
    user: {
        email: null,
        token: null
    },
    setUser: (user) => {},
  });
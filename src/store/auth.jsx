import { createContext, useContext} from 'react';
export const AuthContext = createContext();

export const Authprovider = ({ children }) => {

    const storeTokenInLs = (token,id) => {
     localStorage.setItem('Token', token);
     localStorage.setItem('UserId', id);
    };
    return (
        <AuthContext.Provider value={{storeTokenInLs}}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContext);
};
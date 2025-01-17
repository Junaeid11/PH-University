/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode } from "react";

import { currentToken } from "../../redux/features/auth/authSlice";
import  {useAppSelector}  from "../../redux/features/hooks";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}: {children: ReactNode}) => {

const token = useAppSelector(currentToken);
if(!token){
    return <Navigate to="/login" replace={true} />
}


  return children;
}

export default ProtectedRoute

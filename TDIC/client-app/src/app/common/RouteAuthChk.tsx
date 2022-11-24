import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../stores/store";

interface Props {
    component: React.ReactNode;
    redirect: string
  }  
  
export const RouteAuthChk = ({component, redirect}: Props) => {
    
  const authUser = useStore();    

  
  
  if (!authUser.userStore.user?.username) {
    return <Navigate to={redirect} replace={false} />
  }

  return <>{component}</>;

}
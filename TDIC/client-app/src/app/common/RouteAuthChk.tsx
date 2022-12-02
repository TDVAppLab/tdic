import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../stores/store";

interface Props {
    component: React.ReactNode;
    redirect: string;
    isauth: boolean;
  }  
  
export const RouteAuthChk = ({component, redirect, isauth}: Props) => {
    
  const authUser = useStore();    

  
  if(isauth){
    if (!authUser.userStore.user?.username) {
      return <Navigate to={redirect} replace={false} />
    }
  
    return <>{component}</>;

  }else{
    if (authUser.userStore.user?.username) {
      return <Navigate to={redirect} replace={false} />
    }
  
    return <>{component}</>;

  }

}
import { useContext } from "react"
import {AlertContext} from "../context/AlertContext"

const useAlertContext=()=>{
  const context=useContext(AlertContext);

  if(!context){
    throw Error(
      "no context"
    );
  }

  return context;
}

export default useAlertContext;
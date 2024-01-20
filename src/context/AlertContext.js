import {createContext, useReducer} from "react"

export const AlertContext=createContext();

export const alertReducer=(state, action)=>{
    switch(action.type){
        case "SET_ALERT":
            return{
                alert:action.payload,
            };
        case "CREATE_ALERT":
            return{
                alert:[ ...state.alert,action.payload],
            };
        default:
              return state;
    }
}

export const AlertContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(alertReducer, {
        alert: null,
    }); 
  
    return (
      <AlertContext.Provider value={{ ...state, dispatch }}>
        {children}
      </AlertContext.Provider>
    );
  };
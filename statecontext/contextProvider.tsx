import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";

interface StateContextType {
    appToken: string | null;
    setAppToken: (token: string | null) => void;
    userData: Record<string, any>;
    setUserData: (data: any) => void;
}


const defaultState: StateContextType = {
    appToken: null,
    setAppToken: () => {},
    userData: [],
    setUserData: () => {},
};

type ActionType =
  | { type: 'SET_APP_TOKEN'; payload: string | null }
  | { type: 'SET_USER_DATA'; payload: any }

  const reducer = (state: StateContextType, action: ActionType): StateContextType => {
    switch (action.type) {
        case 'SET_APP_TOKEN':
            return { ...state, appToken: action.payload };
        case 'SET_USER_DATA':
            return { ...state, userData: { ...state.userData, ...action.payload } };
        default:
            return state;
    }
};


// Create Context
const StateContext = createContext<StateContextType>(defaultState);

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    
    useEffect(() => {
        const fetchAppToken = async () => {
            const token = await AsyncStorage.getItem('ACCESS_APP_TOKEN');
            dispatch({ type: 'SET_APP_TOKEN', payload: token });
        };
        
        const fetchUserData = async () => {
            const storedData = await AsyncStorage.getItem('ACCESS_USER_DATA');
            const parsedData = storedData ? JSON.parse(storedData) : {};
            dispatch({ type: 'SET_USER_DATA', payload: parsedData });
        };

        fetchAppToken();
        fetchUserData();
    }, []);


    {/* App token method */}
    const setAppToken = async (token: string | null) => {
        dispatch({ type: 'SET_APP_TOKEN', payload: token });
        if (token) {
            await AsyncStorage.setItem('ACCESS_APP_TOKEN', token);
        } else {
            await AsyncStorage.removeItem('ACCESS_APP_TOKEN');
        }
    };

      {/* DevicE uSER DATA Method */}
      const setUserData = async (data: any) => {
        dispatch({ type: 'SET_USER_DATA', payload: data });
        const updatedData = { ...state.userData, ...data };
        if (Object.keys(updatedData).length > 0) {
            await AsyncStorage.setItem('ACCESS_USER_DATA', JSON.stringify(updatedData));
        } else {
            await AsyncStorage.removeItem('ACCESS_USER_DATA');
        }
    };



      return (
        <StateContext.Provider value={{
            appToken: state.appToken,
            setAppToken,
            userData: state.userData,
            setUserData,
             }}>
          {children}
        </StateContext.Provider>
      );
    };
    
    // Custom hook to use the StateContext
    export const universalContext = () => useContext(StateContext);
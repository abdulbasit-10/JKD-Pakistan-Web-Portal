"use client";
import { createContext, useContext,  useEffect,  useReducer,  useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    // const [theme , setTheme] = useState('light')
    const initialState = {
      theme:'light',
      // email:'',
      // role:'',
      user:null,
      job:true,
      filteredUsers: [],
      filteredApplications: [],
      filteredBookings: []
    }

    const reducer = (state, action) => {
      switch (action.type) {
        // case 'TOGGLE_THEME':
        //   return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
        case'LOGIN':
          return {...state, user:action.payload};
        case 'LOGOUT':
          return { ...initialState };
        case 'JOB':
          return { ...state, job: action.payload };
        case "SET_FILTERED_USERS":
          return { ...state, filteredUsers: action.payload };
        case "SET_FILTERED_APPLICATIONS":
          return { ...state, filteredApplications: action.payload };
        case "SET_FILTERED_BOOKINGS":
          return { ...state, filteredBookings: action.payload };
        default:
          return state;
      }
    };
    
  const loadState = () => {
    if (typeof window === "undefined") return initialState;

    const savedState = localStorage.getItem("globalState");
    return savedState ? JSON.parse(savedState) : initialState;
  };

  const [state, dispatch] = useReducer(reducer, {}, loadState);

  useEffect(() => {
    localStorage.setItem("globalState", JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}

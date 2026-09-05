"use client";
import { createContext, useContext, useEffect, useReducer, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const initialState = {
      theme: 'light',
      user: null,
      job: true,
      filteredUsers: [],
      filteredApplications: [],
      filteredBookings: []
    }

    const reducer = (state, action) => {
      switch (action.type) {
        case 'LOGIN':
          return { ...state, user: action.payload };
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
        case "SYNC_STATE": // ✅ Naya action — doosre tab se sync karne ke liye
          return { ...action.payload };
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

  // ✅ Naya: doosre tabs mein jab bhi localStorage change ho (jaise logout), is tab ko bhi sync karo
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "globalState") {
        const newState = event.newValue ? JSON.parse(event.newValue) : initialState;
        dispatch({ type: "SYNC_STATE", payload: newState });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}

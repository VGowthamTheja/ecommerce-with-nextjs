"use client";

import React, { createContext, useContext, useState } from "react";

interface AppState {
  cart: never[];
  currency: string;
  currencySymbol: string;
  products: never[];
  total: number;
}

interface ProviderProps {
  children: React.ReactNode;
}

const initialState: AppState = {
  cart: [],
  currency: "IN",
  currencySymbol: "₹",
  products: [],
  total: 0,
};

const StateContext = createContext<{
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}>({
  state: initialState,
  setState: () => {},
});

export function StateProvider({ children }: ProviderProps) {
  const [state, setState] = useState<AppState>(initialState);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a StateProvider");
  }
  return context;
}

import { useContext, createContext } from "react";

export const RatesContext = createContext(null);

export function useRate() {
  const ctx = useContext(RatesContext);
  return ctx;
}
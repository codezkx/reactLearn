import { createContext } from 'react';

export const TextContext = createContext(null);

export default function DashboardProvider({text, children}) {
  return (
    <>
      <TextContext.Provider value={text}>
        {children}
      </TextContext.Provider>
    </>
  )
}
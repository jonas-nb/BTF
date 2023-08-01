import React, { createContext, useState, ReactNode } from "react";

// Definição dos tipos personalizados
type GoldPoint = 2 | 4 | 6;
type PropChildren = {
  children: ReactNode;
};

// Interface que define a estrutura do contexto
interface GoldPointContextType {
  goldPoint: GoldPoint;
  setGoldPoint: React.Dispatch<React.SetStateAction<GoldPoint>>;
}

// Estado inicial do contexto
const goldPointDefaultState: GoldPointContextType = {
  goldPoint: 2,
  setGoldPoint: () => {},
};

// Criação do contexto
export const GoldPointContext = createContext<GoldPointContextType>(
  goldPointDefaultState
);

// Componente provedor do contexto
export const GoldPointProvider: React.FC<PropChildren> = ({ children }) => {
  // Definição do estado "goldPoint" e da função para atualizá-lo "setGoldPoint"
  const [goldPoint, setGoldPoint] = useState<GoldPoint>(2);

  // Retorna o contexto envolvendo os componentes filhos "children"
  return (
    <GoldPointContext.Provider value={{ goldPoint, setGoldPoint }}>
      {children}
    </GoldPointContext.Provider>
  );
};

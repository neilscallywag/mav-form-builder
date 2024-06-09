import { useDisclosure } from '@chakra-ui/react';
import { createContext, ReactNode, useState } from 'react';
import { DesignerContextType } from '~pages/formbuilder/types/DesignerContextType';
import { Element } from '~pages/formbuilder/types/Element';




export const DesignerContext = createContext<DesignerContextType | null>(null);

interface DesignerContextProviderProps {
  children: ReactNode;
}

export default function DesignerContextProvider({ children }: Readonly<DesignerContextProviderProps>): JSX.Element {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const disclosure = useDisclosure();

  const addElement = (index: number, element: Element): void => {
    setElements(prev => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string): void => {
    setElements(prev => prev.filter(element => element.id !== id));
  };

  const updateElement = (id: string, element: Element): void => {
    setElements(prev => {
      const newElements = [...prev];
      const index = newElements.findIndex(el => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
        setElements,
        disclosure,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}

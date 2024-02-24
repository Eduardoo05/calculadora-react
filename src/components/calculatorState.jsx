import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
const AppContext = createContext({
    //definir estados del AppContext
    memory: null,
    operation: null,
    currentValue: 0,

    //metodos

    addNumber: (value) => {},
    addOperation: (operation) => {},
    getResult: () => {},
    executeAction: (action) => {},
})

export default function CalculatorState({children}){

    const [memory, setMemory] = useState(null)
    const [operation, setOperation] = useState(null)
    const [currentValue, setCurrentValue] = useState(0)
    const [isReset, setIsReset] = useState(true)

    function handleAddNumber(value){
        if(isReset){
            setCurrentValue(parseInt(value));
            setIsReset(false);
        }else{
            const newValue = currentValue.toString() + value;
            setCurrentValue(newValue);
        }
    }

    function handleAddOperation(op){
        if(currentValue){
            if(operation){
                //tenemos que resolver
                handleGetResult();
            }else{
                setOperation(op);
                setMemory(currentValue);
                setCurrentValue(0);
                setIsReset(true);
            }
        }
    }

    function handleGetResult(){
        let result = 0;
        if(currentValue && operation && memory){
            switch(operation){
                case "+":
                    result = parseFloat(currentValue) + parseFloat(memory);
                    break;
                default:
            }
            setCurrentValue(result);
            setOperation(null);
            setMemory(result);
            setIsReset();
        }
    }

    function handleExecuteAction(action){
        switch(action){
            case '=':
                handleGetResult();
                break;
            default:
        }
    }
    return(
        <>
          <AppContext.Provider value={{
            memory, 
            operation, 
            currentValue, 
            addNumber: handleAddNumber, 
            addOperation: handleAddOperation,
            getResult: handleGetResult,
            executeAction: handleExecuteAction,
            }}>
            {children}
          </AppContext.Provider>
        </>
    )
}

export function useAppContext(){
    return useContext(AppContext)
}
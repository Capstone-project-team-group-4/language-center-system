// Import package members section:
import { useEffect, useState } from "react";

export function useSessionState<T> (
        key: string
        , defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {

    // Variables declaration:
    let sessionState: T;
    let [state, setState] = useState<T> (getStateFromSession ());
    
    function getStateFromSession (): T {
        let jsonState: string | null;

        jsonState = sessionStorage.getItem (key);
        if (jsonState != null){
            sessionState = JSON.parse (jsonState);
        }
        else {
            sessionState = defaultValue;
        }
        return sessionState;
    }

    useEffect (
        () => {
            let jsonState: string | null;

            jsonState = JSON.stringify (state);
            sessionStorage.setItem (key, jsonState);
        }
        , [key, state]
    );
    
    return [state, setState];
}  
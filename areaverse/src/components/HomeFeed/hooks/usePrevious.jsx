import { useEffect } from "react";

export default usePrevious = ( value ) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}


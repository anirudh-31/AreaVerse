import React, { useEffect, useRef } from 'react'

function ShuffleNumber({value}) {
    const numberStr = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const numberRef = useRef();

    useEffect(() => {
        const element = numberRef.current;
        if (element) {
            element.classList.remove('play');
            void element.offsetWidth; 
            element.classList.add('play');
        }
    }, [value]);
  return (
    <strong ref={numberRef} className="shuffle-number" style={{'--digit-count': numberStr.length}}>
            {numberStr.split('').map((char, index) => {
                if (char === ',') {
                    return <span className="digit-column comma" key={index}>,</span>
                }
                const d = parseInt(char, 10);
                return (
                    <span className="digit-column" key={index}>
                        <span className="digit-reel" style={{ '--final-y': `-${d * 1.1}em`, '--delay': `${index * 0.05}s` }}>
                            {[...Array(10)].map((_, i) => <span className="digit" key={i}>{i}</span>)}
                        </span>
                    </span>
                );
            })}
        </strong>
  )
}

export default ShuffleNumber
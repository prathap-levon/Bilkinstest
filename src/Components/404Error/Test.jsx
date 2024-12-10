const { useEffect, useState, useMemo } = require("react");

const Test = ()=>{
    const [value,setValue] = useState(0);
    const [computedValue,setComputedValue] = useState(0);

    useEffect(()=>{
        let val = 0;
        for(let i=1; i<=value; i++){
            val+=i;
        }
        setComputedValue(val);
    },[value]);

    const computedValue2 = useMemo(()=>{
        let val = 0;
        for(let i=1; i<=value; i++){
            val+=i;
        }
        return val
    },[value]);

    return (
        <div>
            <h1>{computedValue}</h1>
            <h2>{computedValue2}</h2>
            <button onClick={()=>setValue(value+1)}>Click</button>
        </div>
    )
}
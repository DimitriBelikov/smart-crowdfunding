import {useState, useEffect, useCallback } from 'react';

export const useMultipleFetch = (urlArray) => {
    console.log(urlArray);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const getData = useCallback(async () => {
        var dataArray = []
        for (let i = 0; i < urlArray.length; i++) {
            const response = await fetch(urlArray[i]);
            const jsonData = await response.json();
            //console.log(response);
            dataArray.push(jsonData);
        }
        setData(dataArray);
        setLoading(false);
    }, [urlArray]);
    useEffect(() => {
        getData();
    }, [urlArray, getData]);
    return { loading, data }
}
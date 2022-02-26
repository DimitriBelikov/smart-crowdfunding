import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getData = useCallback(async () => {
        const response = await fetch(url);
        const jsonData = await response.json();
        //console.log(response);
        setData(jsonData);
        setLoading(false);
    }, [url]);

    useEffect(() => {
        getData();
    }, [url, getData]);
    return { loading, data };
};

export const useMultipleFetch = (urlArray) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getData = useCallback(async () => {
        var dataArray = []
        for (let i = 0; i < urlArray.length; i++) {
            const response = await fetch(urlArray[i]);
            const jsonData = await response.json();
            //console.log(response);
            dataArray.append(jsonData);
        }
        setData(dataArray);
        setLoading(false);
    }, [urlArray]);

    useEffect(() => {
        getData();
    }, [urlArray, getData]);
    return { loading, data }
}
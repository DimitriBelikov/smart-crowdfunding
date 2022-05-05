import { useState, useEffect } from "react";

export const useMultipleFetch = (urlArray) => {
    // console.log(urlArray);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(async () => {
        const requestOptions = {
            withCredentials: true,
            credentials: "include"
        };
        var dataArray = [];
        for (let i = 0; i < urlArray.length; i++) {
            // console.log(i);
            const response = await fetch(urlArray[i], requestOptions);
            const jsonData = await response.json();
            dataArray.push(jsonData);
        }
        setData(dataArray);
        setLoading(false);
    }, []);

    return { loading, data };
};

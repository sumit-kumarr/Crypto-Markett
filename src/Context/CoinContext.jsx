// CoinContextProvider.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { CoinContext } from './CoinContextDef';

const CoinContextProvider = (props) => {
    const [allCoins, setAllCoins] = useState([]);
    const [currency, setCurrency] = useState({
        name: 'inr',
        symbol: '₹'
    });

    const fetchAllCoins = useCallback(async () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'x-cg-demo-api-key': 'CG-t2E5DE52o1yyuomRXCgYi2hs'
                }
            };

            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
                options
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data); // Debug log
            setAllCoins(data);
        } catch (err) {
            console.error('Error fetching coins:', err);
        }
    }, [currency.name]);

    useEffect(() => {
        fetchAllCoins();
    }, [fetchAllCoins]);

    return (
        <CoinContext.Provider value={{
            allCoins,
            setAllCoins,
            currency,
            setCurrency
        }}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
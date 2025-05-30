import { createContext } from 'react';

export const CoinContext = createContext({
    allCoins: [],
    setAllCoins: () => {},
    currency: { name: 'inr', symbol: '₹' },
    setCurrency: () => {}
});

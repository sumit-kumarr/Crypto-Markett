import React from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CoinContext } from '../../Context/CoinContextDef';
import LineCharts from '../../Components/LineCharts/LineCharts';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  // Function to format large numbers
  const formatNumber = (num) => {
    if (num === undefined || num === null) return '0';
    
    try {
      if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + 'B';
      }
      if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + 'M';
      }
      if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + 'K';
      }
      return num.toLocaleString();
    } catch (error) {
      console.error('Error formatting number:', error);
      return '0';
    }
  };

  // Format percentage
  const formatPercentage = (num) => {
    if (num === undefined || num === null) return '0.00%';
    return num.toFixed(2) + '%';
  };

  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      try {
        const currencyName = currency.name.toLowerCase(); // Convert to lowercase for API
        const options = { 
          method: 'GET', 
          headers: { 
            'accept': 'application/json',
            'x-cg-demo-api-key': 'CG-t2E5DE52o1yyuomRXCgYi2hs'  // Add API key
          } 
        };
          const [coinResponse, historyResponse] = await Promise.all([
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(res => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            }),
          fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currencyName}&days=10&interval=daily`, options)
            .then(res => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              return res.json();
            })
        ]);

        console.log('Coin Response:', coinResponse); // Debug log

        if (mounted) {
          if (coinResponse.error) {
            console.error('API Error:', coinResponse.error);
            return;
          }
          setCoinData(coinResponse);
          setHistoricalData(historyResponse);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [coinId, currency]);

  if (!coinData || !historicalData) {
    return (
      <div className='spinner'>
        <div className="spin"></div>
      </div>
    );
  }
  const priceChange = coinData.market_data?.price_change_percentage_24h || 0;
  const priceColor = priceChange >= 0 ? 'rgb(14, 203, 129)' : 'rgb(246, 70, 93)';

  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.name} />
        <p>
          <b>{coinData.name} ({coinData.symbol.toUpperCase()})</b>
          <br />
          <span style={{ fontSize: '1rem', color: priceColor }}>
            {priceChange >= 0 ? '▲' : '▼'} {formatPercentage(Math.abs(priceChange))}
          </span>
        </p>
      </div>

      <div className='coin-chart'>
        <LineCharts historicalData={historicalData} coinId={coinId} />
      </div>      <div className='coin-info'>
        <ul>
          <li>Crypto Market Rank</li>
          <li>#{coinData.market_cap_rank}</li>
        </ul>

        <ul>
          <li>Current Price</li>         
          <li>
            $ {formatNumber(coinData.market_data?.current_price?.usd)}<br/>
            € {formatNumber(coinData.market_data?.current_price?.eur)}<br/>
            ₹ {formatNumber(coinData.market_data?.current_price?.inr)}
          </li>
        </ul>

        <ul>
          <li>Market Cap</li>
          <li>
            $ {formatNumber(coinData.market_data?.market_cap?.usd)}<br/>
            € {formatNumber(coinData.market_data?.market_cap?.eur)}<br/>
            ₹ {formatNumber(coinData.market_data?.market_cap?.inr)}
          </li>
        </ul>

        <ul>
          <li>24 Hour High</li>
          <li>
            $ {formatNumber(coinData.market_data?.high_24h?.usd)}<br/>
            € {formatNumber(coinData.market_data?.high_24h?.eur)}<br/>
            ₹ {formatNumber(coinData.market_data?.high_24h?.inr)}
          </li>
        </ul>

        <ul>
          <li>24 Hour Low</li>
          <li>
            $ {formatNumber(coinData.market_data?.low_24h?.usd)}<br/>
            € {formatNumber(coinData.market_data?.low_24h?.eur)}<br/>
            ₹ {formatNumber(coinData.market_data?.low_24h?.inr)}
          </li>
        </ul>

        <ul>
          <li>Trading Volume</li>
          <li>
            $ {formatNumber(coinData.market_data?.total_volume?.usd)}<br/>
            € {formatNumber(coinData.market_data?.total_volume?.eur)}<br/>
            ₹ {formatNumber(coinData.market_data?.total_volume?.inr)}
          </li>
        </ul>

        <ul>
          <li>Circulating Supply</li>
          <li>{formatNumber(coinData.market_data?.circulating_supply)} {coinData.symbol?.toUpperCase()}</li>
        </ul>

        {coinData.market_data?.max_supply && (
          <ul>
            <li>Max Supply</li>
            <li>{formatNumber(coinData.market_data.max_supply)} {coinData.symbol.toUpperCase()}</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Coin;

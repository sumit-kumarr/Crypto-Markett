import React from 'react'
import './Home.css'
import { useContext } from 'react';
import { CoinContext } from '../Context/CoinContextDef';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const { allCoins, currency } = useContext(CoinContext);  const [displayCoins, setDisplayCoins] = useState([]);
  const [input, setInput] = useState("");
  const [popularCoins, setPopularCoins] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const inputHandler = (event) => {
    const value = event.target.value;
    setInput(value);
    if (value === "") {
      setDisplayCoins(allCoins);
      setNoResults(false);
    } else {
      // Perform search as user types
      const searchTerm = value.toLowerCase();
      const filtered = allCoins.filter((item) => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.symbol.toLowerCase().includes(searchTerm)
      );
      setDisplayCoins(filtered);
      setNoResults(filtered.length === 0);
    }
  }

  const searchHandler = async (event) => {
    event.preventDefault();
    if (!input.trim()) {
      setDisplayCoins(allCoins);
      setNoResults(false);
      return;
    }

    const searchTerm = input.toLowerCase();
    const coins = allCoins.filter((item) => 
      item.name.toLowerCase().includes(searchTerm) || 
      item.symbol.toLowerCase().includes(searchTerm)
    );
    
    setDisplayCoins(coins);
    setNoResults(coins.length === 0);
  }

  useEffect(() => {
    setDisplayCoins(allCoins);
    // Set popular coins (top 10 by market cap)
    if (allCoins.length > 0) {
      const topCoins = allCoins.slice(0, 10);
      setPopularCoins(topCoins);
    }
  }, [allCoins]);

  return (
    <div className='home'>
      <div className='hero'>
        <h1><span className='text-white'>Largest</span> <br /> Crypto Market Place </h1>
        <p>Get all the info regarding your favorite Crypto Currency</p>
        <form onSubmit={searchHandler}>
          <input
            list='coinlist'
            onChange={inputHandler}
            className='bg-white text-black px-10 py-2 rounded-md'
            type="text"
            placeholder='Search for a Crypto Currency'
            required />

          <button type='submit'>Search</button>
        </form>
      </div>

      <div className='popular-coins'>
        <h2 className='text-white'>Popular Cryptocurrencies</h2>
        <Slider {...carouselSettings}>
          {popularCoins.map((coin, index) => (
            <div key={index} className='coin-slide'>
              <Link to={`/coin/${coin.id}`} className='coin-card'>
                <img src={coin.image} alt={coin.name} />
                <h3>{coin.name}</h3>
                <p className='price'>{currency.symbol} {coin.current_price.toLocaleString()}</p>
                <p className={coin.price_change_percentage_24h < 0 ? 'change red' : 'change green'}>
                  {coin.price_change_percentage_24h > 0 ? '+' : ''}
                  {Math.floor(coin.price_change_percentage_24h * 100) / 100}%
                </p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>      <div className='crypto-table'>
        {noResults ? (
          <div className="no-results text-center py-4">
            <p className="text-white text-xl">No cryptocurrencies found matching your search.</p>
            <p className="text-gray-400">Try searching with a different name or symbol.</p>
          </div>
        ) : (
          <>
            <div className='table justify-between'>
              <p>#</p>
              <p>Coin</p>
              <p>Price</p>
              <p className='Time'>24H Change</p>
              <p className='market-cap'>Market Cap</p>
            </div>
            {
          displayCoins.slice(0, 10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className='table' key={index}>
              <p>{item.market_cap_rank}</p>
              <div className=''>
                <img src={item.image} alt="" />
                <p>{item.name + "-" + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h < 0 ? 'red' : 'green'}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>

              <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
            </Link>          ))
        }</>)}
      </div>
    </div>
  )
}
export default Home

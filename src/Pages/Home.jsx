import React from 'react'
import'./Home.css'
import { useContext } from 'react';
import { CoinContext } from '../Context/CoinContextDef';
import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const {allCoins,currency} = useContext(CoinContext);
  const[displayCoins, setDisplayCoins] = useState([]);
  const[input,setInput] = useState("");

  const inputHandler=(event) => {
    setInput(event.target.value);
    if(event.target.value === "") {
      setDisplayCoins(allCoins);
    }
  }

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoins.filter((item) => {
     return item.name.toLowerCase().includes(input.toLowerCase())
  })
  setDisplayCoins(coins);
  setInput("");

}

  useEffect(() => {
    setDisplayCoins(allCoins);

  },[allCoins]);

  return (
    <div className='home'>
      <div className='hero'>
        <h1><span className='text-white'>Largest</span> <br/> Crypto Market Place </h1>
        <p>Get all the info regarding your favorite Crypto Currency</p>
        <form onSubmit={searchHandler} >
          <input 
          list='coinlist'
          onChange={inputHandler}
          className='bg-white text-black px-10 py-2 rounded-md'
          type= "text" placeholder='Search for a Crypto Currency ' required/>

          {/* <details id="coinlist">
            {allCoins.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </details> */}

          <button type='submit'>Search</button>
        </form>
      </div>
        <div className='crypto-table'>
          <div className='table justify-between'>
            <p>#</p>
            <p>Coin</p>
            <p>Price</p>
            <p className='Time'>24H Change</p>
            <p className='market-cap'>Market Cap</p>
          </div>
          {
            displayCoins.slice(0,10).map((item , index) => (
              <Link to = {`/coin/${item.id}`} className='table' key={index}>
                <p>{item.market_cap_rank}</p>
                <div className=''>
                  <img src={item.image} alt=""/>
                  <p>{item.name + "-" +item.symbol}</p>
                </div>
                <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                <p className={item.price_change_percentage_24h < 0 ? 'red' : 'green'}>
                  {Math.floor(item.price_change_percentage_24h*100)/100}
                  </p>
             
                <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
              </Link>
            ))
          }
        </div>
      
    </div>
  )
}
export default Home

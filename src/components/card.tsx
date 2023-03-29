import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import Main from '../containers/main';
import { useQuery } from 'react-query';
import './card.css';
import Header from './Header';
import Pagination from '@mui/material/Pagination/Pagination';

interface Player {
  Id: string;
  PFName: string;
  TName: string;
  Value: number;
}

interface ApiResponse {
  playerList: Player[];
}

const Card: React.FC = () => {
  const { isLoading, error, data } = useQuery<ApiResponse>('players', () =>
    axios.get('https://api.npoint.io/20c1afef1661881ddc9c').then((res) => res.data)
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;

  const filteredPlayers = useMemo(() => {
    if (!data) return [];
    const filtered = data.playerList.filter((player) => {
      return (
        player.PFName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.TName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    filtered.sort((a, b) => (a.Value > b.Value ? 1 : b.Value > a.Value ? -1 : 0)); console.log("filtered", filtered.length)
    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    return filtered.slice(indexOfFirstPlayer, indexOfLastPlayer);
  }, [data, searchQuery, currentPage]);

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: Something went wrong</div>;



  const count = data ? Math.ceil(data.playerList.length / playersPerPage) : 1;
  
  return (
    <>
      <div className='back'>
        <div className="FPlayer-search">
          <input
            type="text"
            className="search-field"
            placeholder="Search by name"
            onChange={handleSearchQueryChange}
          />
        </div>
        <div className="container">
          {filteredPlayers.map((playerData) => (
            <div className='child-container'>
              <Main playerData={playerData} key={playerData.Id} />
            </div>
          ))}
        </div>
        <div style={{ marginLeft: '70%' }}>
          <Pagination
            //  count={10} 
            color="primary"
            count={count}
            onChange={(event, value) => {
              setCurrentPage(value)
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Card;

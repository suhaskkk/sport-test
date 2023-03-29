import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MainImg: React.FC = () => {
  const { state } = useLocation();

  return (
    <>
      <Link to="/">Back</Link>
      <div>
        <img src={`/images/${state.id}.jpg`} alt="no-img" height="400px" width="400px" />
      </div>
    </>
  );
};

export default MainImg;

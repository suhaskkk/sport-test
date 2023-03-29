import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';



interface Match {
  Id: string;
  CCode: string;
  VsCCode: string;
  MDate: string;
  className:string;
}


interface playerData {
  playerData: any;
}

const Main: React.FC<playerData> = ({ playerData }) => {
  const navigate = useNavigate();

  const navigateImage = (id: string) => {
    console.log(id);
    navigate(`/player-image/${id}`, {
      state: { id },
    });
  };

 

  return (
    <>
      <div className="player-list">
        <img
          className="player-image"
          src={`images/${playerData.Id}.jpg`}
          alt="no-img"
          onClick={() => navigateImage(playerData.Id)}
        />
        <h3 className="pname">{playerData.PFName}</h3>
        <div className="player-details ">
          <h4>
            <span className="skill">Skill:</span> {playerData.SkillDesc}
          </h4>
          <h4>
            <span className="skill">Value:</span> ${playerData.Value}
          </h4>
        </div>
          <hr/>
        <h4 style={{marginLeft:'5%'}}>Upcoming Match List</h4>

        {playerData.UpComingMatchesList.map((match: Match) => (
          <div key={match.Id}>
            <p className="code">
              {match.CCode} vs {match.VsCCode}
              <br />
              {dayjs(match.MDate).format('DD-MM-YYYY h:mm:ss')}
            </p>
          </div>
        ))}
      </div>
      
    </>
  );
};

export default Main;
function setPage(currPage: any) {
  throw new Error('Function not implemented.');
}

function setSelectedTab(title: any) {
  throw new Error('Function not implemented.');
}


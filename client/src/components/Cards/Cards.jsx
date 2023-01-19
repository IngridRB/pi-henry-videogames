import "./cards.css";
import React from "react";
import Card from "../Card/Card.jsx";

const Cards = ({ videoGames }) => {

  return (
    <div className="cards">
    { 
      videoGames.map((videoGame) => {
        return (
          <Card 
            key={videoGame.name}
            id={videoGame.id}
            img={videoGame.img}
            name={videoGame.name}
            genres={videoGame.genres}
            rating={videoGame.rating}
          />
        );
      })
    }
    </div>
  )
};

export default Cards;
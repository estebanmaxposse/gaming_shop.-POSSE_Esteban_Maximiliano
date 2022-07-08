import React from "react";
import { Carousel } from "react-bootstrap";

const gamesCollection = [
  {
    "title": "New Super Mario Bros. U Deluxe",
    "src": require("../img/slide_mario.png"),
    "description": "Join Mario, Luigi, and pals for single-player or multiplayer fun anytime, anywhere! Take on two family-friendly, side-scrolling adventures with up to three friends as you try to save the Mushroom Kingdom!",
  },
  {
    "title": "Final Fantasy 7 Remake Intergrade",
    "src": require("../img/slide_ff7.png"),
    "description": "The world of the timeless classic FINAL FANTASY VII is reborn, using cutting-edge graphics technology, a new battle system and an additional adventure featuring Yuffie Kisaragi.",
  },
  {
    "title": "Skullgirls 2nd Encore: Umbrella is here!",
    "src": require("../img/slide_skullgirls.png"),
    "description": "Excuuuse me, Princess! Introducing the one and only UMBRELLA! As part of the Season Pass 1, the saltiest sibling in the Canopy Kingdom (and her insatiable monstrosity Hungern) have at long last joined the Skullgirls roster!"
  },
]

const HomeCarousel = () => {
  return (
    <div>
      <Carousel variant="dark">
        {
          gamesCollection.map(
            (game, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={game.src}
                  alt={game.title}
                />
                <Carousel.Caption>
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )
          )
        }
      </Carousel>
    </div>
  );
};

export default HomeCarousel;

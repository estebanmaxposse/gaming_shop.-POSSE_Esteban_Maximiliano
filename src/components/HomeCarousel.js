import React from "react";
import { Carousel, Button } from "react-bootstrap";

const gamesCollection = [
  {
    "title": "New Super Mario Bros. U Deluxe",
    "heading": "On sale!",
    "src": require("../img/slide_mario_web.png"),
    "description": "Join Mario, Luigi, and pals for single-player or multiplayer fun anytime, anywhere! Take on two family-friendly, side-scrolling adventures with up to three friends as you try to save the Mushroom Kingdom!",
  },
  {
    "title": "Final Fantasy 7 Remake Intergrade",
    "heading": "New arrival",
    "src": require("../img/slide_ff7_web.png"),
    "description": "The world of the timeless classic FINAL FANTASY VII is reborn, using cutting-edge graphics technology, a new battle system and an additional adventure featuring Yuffie Kisaragi.",
  },
  {
    "title": "Skullgirls 2nd Encore: Umbrella is here!",
    "heading": "New DLC Available!",
    "src": require("../img/slide_skullgirls_carousel.png"),
    "description": "Excuuuse me, Princess! Introducing the one and only UMBRELLA! As part of the Season Pass 1, the saltiest sibling in the Canopy Kingdom (and her insatiable monstrosity Hungern) have at long last joined the Skullgirls roster!"
  },
]

const HomeCarousel = () => {
  return (
    <div>
      <Carousel>
        {
          gamesCollection.map(
            (game, index) => (
              <Carousel.Item key={index} id={"carousel-item-" + (index+1)}>
                  <img
                  className="d-block carousel-item-img"
                  src={game.src}
                  alt={game.title}
                  />
                <Carousel.Caption className="d-grid">
                  <div className="row" id={"carousel-item-caption-" + (index+1)}>
                    <div className="col">
                      <p className="carousel-item-heading">{game.heading}</p>
                      <h3 className="carousel-item-title">{game.title}</h3>
                      <p className="carousel-item-description">{game.description}</p>
                      <Button className="carousel-item-button">Get it Now!</Button>
                    </div>
                    <div className="col"></div>
                  </div>
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

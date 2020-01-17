import React from 'react';
import Button from './Button';
import Modal from './Modal';
import './TitleScreen.css';

const TitleScreen = ({ isOpen, onStartGame, highScore }) => {
  return (
    <Modal isOpen={isOpen}>
      <div className="title-screen">
        <h1>Snake</h1>
        <p>
          made with React
          <br />
          by W. Newcomb
        </p>
        <h2>High Score: {highScore} </h2>
        <Button onClick={onStartGame}>Start Game</Button>
      </div>
    </Modal>
  );
};

export default TitleScreen;

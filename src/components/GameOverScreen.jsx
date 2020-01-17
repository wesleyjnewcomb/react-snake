import React from 'react';
import Modal from './Modal';
import Button from './Button';

import './GameOverScreen.css';

const GameOverScreen = ({ isOpen, onReplay, score }) => {
  return (
    <Modal isOpen={isOpen}>
      <div className="game-over-screen">
        <h1>Game Over</h1>
        <h2>Score: {score} </h2>
        <Button onClick={onReplay}>Replay</Button>
      </div>
    </Modal>
  );
};

export default GameOverScreen;

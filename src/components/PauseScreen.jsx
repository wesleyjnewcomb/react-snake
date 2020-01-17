import React from 'react';
import Modal from './Modal';

import './PauseScreen.css';

const PauseScreen = ({ isOpen }) => {
  return (
    <Modal isOpen={isOpen}>
      <div className="pause-screen">
        <h1>Paused</h1>
        <p>Click in game window to resume game.</p>
      </div>
    </Modal>
  );
};

export default PauseScreen;

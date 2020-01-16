import React from 'react';

import { TILE_WIDTH } from '../globals';
import './Apple.css';

const Apple = props => {
  const { x, y } = props;
  const style = {
    width: TILE_WIDTH,
    height: TILE_WIDTH,
    left: x * TILE_WIDTH,
    top: y * TILE_WIDTH
  };
  return <div className="apple" style={style}></div>;
};

export default Apple;

import React from 'react';
import PropTypes from 'prop-types';

import { TILE_WIDTH } from '../globals';
import { inverse, dirToStr } from '../direction';
import './SnakeSegment.css';

const SnakeSegment = props => {
  const { x, y, fromDir, toDir } = props;
  const className = 'snake-segment snake-segment--'
    .concat(dirToStr(inverse(fromDir)))
    .concat(dirToStr(toDir));
  const style = {
    width: TILE_WIDTH,
    height: TILE_WIDTH,
    left: x * TILE_WIDTH,
    top: y * TILE_WIDTH
  };
  return <div className={className} style={style}></div>;
};

SnakeSegment.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  fromDir: PropTypes.number,
  toDir: PropTypes.number
};

export default SnakeSegment;

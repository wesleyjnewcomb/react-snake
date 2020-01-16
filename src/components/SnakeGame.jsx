import React, { Component } from 'react';

import Snake from './Snake';
import Apple from './Apple';
import { TILE_WIDTH } from '../globals';
import { DIRECTION, getStep } from '../direction';
import './SnakeGame.css';

const wrap = (pos, height, width) => {
  let { x, y } = pos;
  while (x < 0) x += width;
  while (x > width - 1) x -= width;
  while (y < 0) y += height;
  while (y > height - 1) y -= height;
  return { x, y };
};

class SnakeGame extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState(props);
    this.gameTick = this.gameTick.bind(this);
    this.processKeyboardInput = this.processKeyboardInput.bind(this);
  }

  initialState(props) {
    return {
      score: 0,
      length: 4,
      direction: DIRECTION.NORTH,
      snake: [
        { x: Math.floor(props.width / 2), y: Math.floor(props.height / 2) }
      ],
      apple: { x: 5, y: 4 }
    };
  }

  componentDidMount() {
    const intervalId = window.setInterval(this.gameTick, 1000 / 15);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.intervalId);
  }

  // TODO: Refactor this so that we don't need to reiterate over entire snake every tick
  isSpaceFree(pos) {
    for (let segment of this.state.snake) {
      if (segment.x === pos.x && segment.y === pos.y) {
        return false;
      }
    }
    return true;
  }

  gameTick() {
    const { snake, direction, length, apple } = this.state;
    const { height, width } = this.props;
    const oldHead = snake[snake.length - 1];
    const { x, y } = wrap(getStep(oldHead, direction), height, width);
    if (this.isSpaceFree({ x, y })) {
      let newSnake = snake.concat({
        x,
        y
      });
      if (apple.x === x && apple.y === y) {
        const newLength = length + 1;
        this.setState({ score: this.state.score + 1 });
        const newApple = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };
        this.setState({ length: newLength, apple: newApple });
      }
      while (newSnake.length > length) {
        newSnake = newSnake.slice(1);
      }
      this.setState({
        snake: newSnake
      });
    } else {
      alert(`You lose!\nScore: ${this.state.score}`);
      this.setState(this.initialState(this.props));
    }
  }

  processKeyboardInput(e) {
    const keyCode = e.keyCode;
    switch (keyCode) {
      // FIX: These conditionals are not sufficient to prevent in-place crashes
      case 37: // left
        if (this.state.direction !== DIRECTION.EAST) {
          this.setState({ direction: DIRECTION.WEST });
        }
        break;
      case 38: // up
        if (this.state.direction !== DIRECTION.SOUTH) {
          this.setState({ direction: DIRECTION.NORTH });
        }
        break;
      case 39: // right
        if (this.state.direction !== DIRECTION.WEST) {
          this.setState({ direction: DIRECTION.EAST });
        }
        break;
      case 40: //down
        if (this.state.direction !== DIRECTION.NORTH) {
          this.setState({ direction: DIRECTION.SOUTH });
        }
        break;
      default:
    }
  }

  render() {
    const scoreStyle = {
      width: this.props.width * TILE_WIDTH
    };
    const boardStyle = {
      height: this.props.height * TILE_WIDTH,
      width: this.props.width * TILE_WIDTH
    };
    return (
      <div className="game">
        <div className="game__score" style={scoreStyle}>
          Score: {this.state.score}
        </div>
        <div
          className="game__board"
          style={boardStyle}
          tabIndex="0"
          onKeyDown={this.processKeyboardInput}
        >
          <Snake snake={this.state.snake} />
          <Apple {...this.state.apple} />
        </div>
      </div>
    );
  }
}

SnakeGame.defaultProps = {
  height: 25,
  width: 25
};

export default SnakeGame;

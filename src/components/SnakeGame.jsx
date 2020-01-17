import React, { Component } from 'react';

import Snake from './Snake';
import Apple from './Apple';
import TitleScreen from './TitleScreen';
import PauseScreen from './PauseScreen';
import GameOverScreen from './GameOverScreen';
import { TILE_WIDTH, GAME_STATE } from '../globals';
import { DIRECTION, getStep } from '../direction';
import './SnakeGame.css';

const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;

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
    this.state = {
      gameState: GAME_STATE.TITLE,
      ...this.initialGameState()
    };
    this.setBoardRef = this.setBoardRef.bind(this);
    this.startGame = this.startGame.bind(this);
    this.gameTick = this.gameTick.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.unpauseGame = this.unpauseGame.bind(this);
    this.processKeyboardInput = this.processKeyboardInput.bind(this);
  }

  initialGameState() {
    return {
      score: 0,
      length: 4,
      direction: DIRECTION.NORTH,
      snake: [
        {
          x: Math.floor(this.props.width / 2),
          y: Math.floor(this.props.height / 2)
        }
      ],
      apple: { x: 5, y: 4 }
    };
  }

  componentDidMount() {
    // TODO: Load high score from localStorage
    this.setState({ highScore: 0 });
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  setBoardRef(element) {
    this.boardRef = element;
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

  startGame() {
    this.setState({
      gameState: GAME_STATE.SNAKE,
      ...this.initialGameState()
    });
    this.boardRef.focus();
    this.intervalId = window.setInterval(this.gameTick, 1000 / 15);
  }

  pauseGame() {
    if (this.state.gameState === GAME_STATE.SNAKE) {
      this.setState({ gameState: GAME_STATE.PAUSED });
      window.clearInterval(this.intervalId);
    }
  }

  unpauseGame() {
    if (this.state.gameState === GAME_STATE.PAUSED) {
      this.setState({ gameState: GAME_STATE.SNAKE });
      this.intervalId = window.setInterval(this.gameTick, 1000 / 15);
    }
  }

  gameTick() {
    const { snake, direction, length, apple, score, highScore } = this.state;
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
        const newScore = score + 1;
        const newHighScore = newScore > highScore ? newScore : highScore;
        const newApple = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };

        this.setState({
          length: newLength,
          score: newScore,
          highScore: newHighScore,
          apple: newApple
        });
      }
      while (newSnake.length > length) {
        newSnake = newSnake.slice(1);
      }
      this.setState({
        snake: newSnake
      });
    } else {
      this.gameOver();
    }
  }

  processKeyboardInput(event) {
    const keyCode = event.keyCode;
    switch (keyCode) {
      // FIX: These conditionals are not sufficient to prevent in-place crashes
      case LEFT_KEY: // left
        if (this.state.direction !== DIRECTION.EAST) {
          this.setState({ direction: DIRECTION.WEST });
        }
        break;
      case UP_KEY: // up
        if (this.state.direction !== DIRECTION.SOUTH) {
          this.setState({ direction: DIRECTION.NORTH });
        }
        break;
      case RIGHT_KEY: // right
        if (this.state.direction !== DIRECTION.WEST) {
          this.setState({ direction: DIRECTION.EAST });
        }
        break;
      case DOWN_KEY: //down
        if (this.state.direction !== DIRECTION.NORTH) {
          this.setState({ direction: DIRECTION.SOUTH });
        }
        break;
      default:
    }
  }

  gameOver() {
    const { score, highScore } = this.state;
    window.clearInterval(this.intervalId);
    this.setState({
      gameState: GAME_STATE.GAME_OVER
    });
  }

  render() {
    const { gameState, score, highScore } = this.state;
    const scoreStyle = {
      width: this.props.width * TILE_WIDTH
    };
    const boardStyle = {
      height: this.props.height * TILE_WIDTH,
      width: this.props.width * TILE_WIDTH
    };
    return (
      <div className="game">
        <div className="game__header" style={scoreStyle}>
          <span className="high-score">High Score: {highScore}</span>
          <span className="score">Score: {score}</span>
        </div>
        <div
          ref={this.setBoardRef}
          className="game__board"
          style={boardStyle}
          tabIndex="0"
          onKeyDown={this.processKeyboardInput}
          onBlur={this.pauseGame}
          onFocus={this.unpauseGame}
        >
          <Snake snake={this.state.snake} />
          <Apple {...this.state.apple} />
          <TitleScreen
            isOpen={gameState === GAME_STATE.TITLE}
            onStartGame={this.startGame}
            highScore={highScore}
          />
          <PauseScreen isOpen={gameState === GAME_STATE.PAUSED} />
          <GameOverScreen
            isOpen={gameState === GAME_STATE.GAME_OVER}
            onReplay={this.startGame}
            score={score}
          />
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

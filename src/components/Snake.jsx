import React from 'react'

import SnakeSegment from './SnakeSegment'

const Snake = props => {
  const { snake } = props
  const segments = snake.map(segment => {
    return <SnakeSegment key={`${segment.x}, ${segment.y}`} {...segment} />
  })
  return (
    <div className='snake'>
      {segments}
    </div>
  )
}

export default Snake

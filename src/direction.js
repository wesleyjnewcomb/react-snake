export const DIRECTION = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3
};
export const inverse = dir => (dir > 1 ? dir - 2 : dir + 2);
export const getStep = (pos, dir) => {
  switch (dir) {
    case DIRECTION.NORTH:
      return { x: pos.x, y: pos.y - 1 };
    case DIRECTION.EAST:
      return { x: pos.x + 1, y: pos.y };
    case DIRECTION.SOUTH:
      return { x: pos.x, y: pos.y + 1 };
    case DIRECTION.WEST:
      return { x: pos.x - 1, y: pos.y };
    default:
      return pos;
  }
};
export const dirToStr = dir => {
  if (!dir) return '';
  switch (dir) {
    case DIRECTION.NORTH:
      return 'north';
    case DIRECTION.EAST:
      return 'east';
    case DIRECTION.SOUTH:
      return 'south';
    case DIRECTION.WEST:
      return 'west';
    default:
      throw 'Invalid direction';
  }
};

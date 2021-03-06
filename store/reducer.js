const {
  ADD_ROOM,
  ADD_PLAYER_TO_ROOM,
  UPDATE_PLAYER,
  DELETE_PLAYER_FROM_ROOM
} = require('./actions');

const reducer = (state = {}, action) => {
  const stateCopy = { ...state };
  let playersArr, index;
  switch (action.type) {
    case ADD_ROOM:
      stateCopy[action.roomName] = [];
      return stateCopy;
    case ADD_PLAYER_TO_ROOM:
      stateCopy[action.roomName] = [
        ...stateCopy[action.roomName],
        action.player
      ];
      return stateCopy;
    case DELETE_PLAYER_FROM_ROOM:
      if (
        stateCopy[action.roomName] &&
        stateCopy[action.roomName].length - 1 > 0
      ) {
        stateCopy[action.roomName] = stateCopy[action.roomName].filter(
          player => player.id !== action.player.id
        );
      } else if (
        stateCopy[action.roomName] &&
        stateCopy[action.roomName].length - 1 <= 0
      ) {delete stateCopy[action.roomName];}
      return stateCopy;
    case UPDATE_PLAYER:
      if (stateCopy[action.roomName]){
      playersArr = stateCopy[action.roomName].slice();
      index = playersArr.findIndex(player => player.id === action.player.id);
      playersArr[index] = {...playersArr[index], ...action.player} // ISAIAS WROTE THIS
      stateCopy[action.roomName] = playersArr;
      return stateCopy;
      }
    default:
      return state;
  }
};

module.exports = reducer;

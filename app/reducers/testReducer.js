
const initData = [1,2,3];

export default function testReducer(data = initData, action) {

  if (action.type === 'SET') {

    return action.data;

  }

  return data;
}

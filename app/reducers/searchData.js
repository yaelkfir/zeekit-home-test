const initData = []
;

export default function searchData(data = initData, action) {

  if (action.type === 'SET_SEARCH_RESULTS') {
    return action.data;
  }

  return data;
}

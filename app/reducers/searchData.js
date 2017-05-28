const initData = []
;

export default function searchData(data = initData, action) {

  if (action.type === 'SET_SEARCH_RESULTS') {
    return action.data;
  }

  if (action.type === 'FILTER_BY_REGION') {

    const resultsData = [];

      const xhr = new XMLHttpRequest();

      xhr.open('GET',`https://restcountries.eu/rest/v2/name/${action.query}`);

      xhr.addEventListener('load', () => {
        let appData = JSON.parse(xhr.responseText);

        for (const country of appData){
          if(country.region === action.region){
            resultsData.push(country);
          }
        }

        console.info('loop',resultsData);

      });

      xhr.addEventListener('error', () => {
        console.info('error');
      });

      xhr.send();
      return resultsData;


    }


  return data;
}

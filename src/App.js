import { useCallback, useEffect } from 'react';
import './App.css';
import { ENVRONMENT } from './environments/environment';
import { NEWSCATEGORY } from './utils/enum'
import useHttp from './hooks/use-http';
import Select from './components/shared/Select';
import Card from './components/shared/Card';
import News from './components/News';

function App() {
  const apiBaseUrl = ENVRONMENT.apiUrl;
  const defaultCategory = NEWSCATEGORY.All;
  let selectedCategory = '';
  let apiURL = '';
  const { loading, error, data: resp, sendRequest: fetchNews } = useHttp();

  // call back method - called from useHttp when API call done.
  const fetchNewsHandler = useCallback(() => {
    console.log("Fetch news handler called...", resp);
  })

  // Call API on any event e.i. Drop down select or any button click
  const makeNewsCallback = useCallback(() => {
    fetchNews(apiURL, fetchNewsHandler)
  }, [fetchNews, apiURL, fetchNewsHandler]);

  // Fetch news on page load with default catogery-all
  useEffect(() => {
    apiURL = `${apiBaseUrl}${defaultCategory}`;
    fetchNews(apiURL, fetchNewsHandler)
  }, []);

  // Drop down categories change handler
  const onChangeHandler = useCallback((evt) => {
    selectedCategory = evt.target.value;
    apiURL = `${apiBaseUrl}${selectedCategory}`;
    makeNewsCallback()
  }, [makeNewsCallback])

  let element;
  if (loading) {
    element = <h3>Loading....</h3>
  }
  if (error) {
    element = <h3>Some thing went wrong.</h3>
  }
  if (resp && resp.data && resp.data.length == 0) {
    element = <h3>News not found.</h3>
  }
  if (resp && resp.data && resp.data.length > 0) {
    element = <News className='container' newsList={resp.data} />

  }
  return (
    <div className="App">
      <h2>Top News Headlines (Bulkesh Kumawat)</h2>
      <h3>React: Custom Hook useHttp (With Reducer)</h3>
      <Select className='container' catagory={NEWSCATEGORY} onChange={onChangeHandler} />
      {element}
    </div>
  );
}

export default App;

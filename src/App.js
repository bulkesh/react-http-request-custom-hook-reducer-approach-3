import { useEffect } from 'react';
import './App.css';
import { ENVRONMENT } from './environments/environment';
import { NEWSCATEGORY } from './utils/enum'
import useHttp from './hooks/use-http';

function App() {
  const apiURL = `${ENVRONMENT.apiUrl}${NEWSCATEGORY.TECH}`;
  const { loading, error, data: resp } = useHttp(apiURL);
  useEffect(() => {
    console.log("app use effect loaded : ", ENVRONMENT);
    console.log("NEWSCATEGORY : ", NEWSCATEGORY);

  }, []);

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
    element = resp.data.map((news, index) => (
      <div key={news.id} className='news-container'>
        <div className='news-list'>
          <div className='image-container'>
            <img className='image' src={news.imageUrl} alt={news.author} />
          </div>
          <div className='news'>
            <h3>{`${news.title}`}</h3>
            <span><b>Story by</b> {`${news.author} - ${news.time} on ${news.date}`}</span>
            <span>{`${news.content}`}</span><br/>
            <span>Read more at : <b><a href={news.readMoreUrl} target="_blank">ANI</a></b></span>
            <span>Read  : <b><a href={news.url} target="_blank">inshorts</a></b></span>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <div className="App">
      <h2>Custom Hook useHttp (with reducer)</h2>
      {element}
    </div>
  );
}

export default App;

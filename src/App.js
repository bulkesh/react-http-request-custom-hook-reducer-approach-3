import { useEffect } from 'react';
import './App.css';
import { ENVRONMENT } from './environments/environment';
import { NEWSCATEGORY } from './utils/enum'
import useHttp from './hooks/use-http';

function App() {
  const apiURL = `${ENVRONMENT.apiUrl}${NEWSCATEGORY.NATIONAL}`;
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
            <span><b>Author : </b>{`${news.author}`}</span>
            <span><b>Date : </b>{`${news.date}`}</span>
            <span><b>Time : </b>{`${news.time}`}</span>
            <span><b>Title : </b>{`${news.title}`}</span>
            <span><b>Content : </b>{`${news.content}`}</span>
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

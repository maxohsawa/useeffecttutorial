import React, { useEffect, useState } from 'react';

function App() {

  const [resourceType, setResourceType] = useState('posts');
  const [content, setContent] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect( () => {
    console.log('on mount');
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    console.log('resource type changed');
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then(response => response.json()
      .then(json => setContent(json))
      );
    
  }, [resourceType]);

  return (
    <div className="App">
      
      <h1>{windowWidth}</h1>
      <button onClick={() => setResourceType('posts')}>Posts</button>
      <button onClick={() => setResourceType('users')}>Users</button>
      <button onClick={() => setResourceType('comments')}>Comments</button>
      <h1>{resourceType}</h1>
      <div>
        {content.map(item => {
          return <pre>{JSON.stringify(item)}</pre>
        })}
      </div>
    </div>
  ); 
}

export default App;

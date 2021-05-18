import Navigation from './component/Navigation'
import ReactDOM from 'react-dom';

function App() {
  return (
    <div>
      <Navigation />
    </div>
  );
}

export default App;
if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'));
}
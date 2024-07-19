import { Provider } from 'react-redux';
import './App.css';
import MenuComponent from './components/Menu/Menu';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MenuComponent />
      </div>
    </Provider>
  );
}

export default App;

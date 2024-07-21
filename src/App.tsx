import { Provider } from 'react-redux';
import './App.css';
import MenuComponent from './components/Menu/Menu';
import store from './redux/store';

function App() {
  return (
    <div className="App">
        <Provider store={store}>
        <MenuComponent />
    </Provider>
      </div>
  );
}

export default App;

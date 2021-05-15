import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Cards from './Cards/Cards';
import CardEdit from './Cards/CardEdit';
import CardAdd from './Cards/CardAdd';

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import './main.css';
import Landing from './Landing';
import rootReducer from './Reducers/rootReducer';


const store = createStore(rootReducer)

function App() {
    return ( 
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Landing}/>
              <Route exact path='/cards' component={Cards}/>
              <Route path='/cards/add' component={CardAdd} />
              <Route path='/cards/:id/edit' component={CardEdit} />
            </Switch>
          </BrowserRouter>
        </Provider>
    );
}

export default App;
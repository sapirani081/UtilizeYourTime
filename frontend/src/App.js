import {Route,Switch} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import React,{Suspense, useContext} from 'react';
import AuthContext from './store/auth-context';

const Welcome= React.lazy(()=>  import('./pages/Welcome'));
const AuthPage= React.lazy(()=>  import('./pages/AuthPage'));
const NotFoundPage= React.lazy(()=>  import('./pages/NotFoundPage'));
const TasksPage= React.lazy(()=>  import('./pages/TasksPage'));
const AddNewTask= React.lazy(()=>  import('./pages/AddNewTask'));
const TaskDetailsPage=React.lazy(()=>  import('./pages/TaskDetailsPage'));

function App() {
    return (
      <div>
        <Layout>
        <Suspense fallback={<div></div>}>
          <Switch>
              <Route path='/' exact>
                <Welcome/>
              </Route>
              <Route path='/auth' exact>
                <AuthPage/>
              </Route>
              <Route path='/tasks' exact>
                <TasksPage/>
              </Route>
              <Route path='/addnewtask' exact>
                <AddNewTask/>
              </Route>
              <Route path='/tasks/:id' exact>
                <TaskDetailsPage/>
              </Route>
              <Route path='*' >
                <NotFoundPage/>
              </Route>
             
          </Switch>
          </Suspense>
            
       </Layout>
      </div>
    );
}

export default App;
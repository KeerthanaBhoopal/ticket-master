import React from 'react'

import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import Register from './components/Users/Register'
import Login from './components/Users/Login'
import CustomerList from './components/customers/List'
import CustomerNew from './components/customers/New'
import CustomerShow from './components/customers/CustomerShow'
import DepartmentList from './components/departments/DepartmentList'
import EmployeeList from './components/employees/EmployeeList'
import NewEmployee from './components/employees/NewEmployee'
import TicketList from './components/tickets/TicketList'
import TicketNew from './components/tickets/TicketNew'
import TicketShow from './components/tickets/TicketShow'
import EmployeeShow from './components/employees/EmployeeShow'
//import Container from './test/Container'
import CustomerEdit from './components/customers/Edit'
import DepartmentShow from './components/departments/DepartmentShow'
import TicketEdit from './components/tickets/TicketEdit'
import EmployeeEdit from './components/employees/EmployeeEdit'

function App() {

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.href = '/account/login'
    // return (
    //  <Redirect to="/account/login"/>
    // ) < does not work
  }

  return (
    <BrowserRouter>
    
      <div>
        <h1>Ticketmaster</h1>
        <Link to="/">Home</Link>
        {
          localStorage.getItem('authToken') ? (
            <div>
              {/* <Link to="/test">Test</Link> */}
              <Link to="/customers"> Customers </Link>
              <Link to="/departments"> Departments </Link>
              <Link to="/employees"> Employees </Link>
              <Link to="/tickets"> Tickets </Link>
              <Link to="#" onClick={handleLogout}>Logout</Link>
            </div>
          ) : (
            <div>
              <Link to="/account/login">Login</Link>
              <Link to="/account/register">Register</Link>
            </div>
          )
        }
        
      </div>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/account/register" component={Register} />
        <Route path="/account/login" component={Login} />

        <Route path="/customers" component={CustomerList} exact />
        <Route path="/customers/new" component={CustomerNew} />
        {/* If you do it this way, customers/new matches customers/:id, so BOTH the add customer page and the show customer page will display when you head over to the CustomerNew component. So use switch! When you do use it, don't put the show route before the new route*/}
        {/* Obviously since customers/new is nota  match for customers/:id, it won't happen when you go to the customerSHOW component */}
        {/* The way this works is... if something matches it stops looking for others that match. It breaks. */}
        <Route path="/customers/edit/:id" component={CustomerEdit} />
        <Route path="/customers/:id" component={CustomerShow} />

        <Route path="/departments" component={DepartmentList} exact/>
        <Route path="/departments/:id" component={DepartmentShow} />

        <Route path="/employees" component={EmployeeList} exact />
        <Route path="/employees/new" component={NewEmployee} />
        <Route path="/employees/edit/:id" component={EmployeeEdit} />
        <Route path="/employees/:id" component={EmployeeShow} />

        <Route path="/tickets" component={TicketList} exact />
        <Route path="/tickets/new" component={TicketNew} />
        <Route path="/tickets/edit/:id" component={TicketEdit}/>
        <Route path="/tickets/:id" component={TicketShow}/>

        {/* <Route path="/test" component={Container} /> */}
      </Switch>
    </BrowserRouter>

  )
}

export default App
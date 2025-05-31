import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AuthGuard from './AuthGuard'
<<<<<<< HEAD

import Homepage from '../pages/Homepage'
=======
>>>>>>> f70bcabc1c8d86689e34f00fb0ac05c95ea186aa

import { routes, NO_USER } from './routes'

export default function AppRoutes() {
  return <Routes>
    {
      routes.map(route => {
        let element
        if(route.userLevel > NO_USER) {
          element = <AuthGuard userLevel={route.userLevel}>
            { route.element }
          </AuthGuard>
        }
        else element = route.element

<<<<<<< HEAD
    <Route path="/login" element={ <Login /> } />

    <Route path="/cars" element={<AuthGuard> <CarList /> </AuthGuard>} />
    <Route path="/cars/new" element={<AuthGuard> <CarForm /> </AuthGuard>} />
    <Route path="/cars/:id" element={<AuthGuard> <CarForm /> </AuthGuard>} />

    <Route path="/customers" element={ 
      <AuthGuard> <CustomerList /> </AuthGuard>
    } />
    <Route path="/customers/new" element={ 
      <AuthGuard> <CustomerForm /> </AuthGuard>
    } />
    <Route path="/customers/:id" element={ 
      <AuthGuard> <CustomerForm /> </AuthGuard>
    } />

    <Route path="/users" element={ <AuthGuard adminOnly={true} > <UserList /> </AuthGuard> } />
    <Route path="/users/new" element={ <AuthGuard adminOnly={true} > <UserForm /> </AuthGuard> } />
    <Route path="/users/:id" element={ <AuthGuard adminOnly={true} > <UserForm /> </AuthGuard> } />
    
=======
        return <Route
          key={route.path}
          path={route.path}
          element={element}
        />
      })
    }    
>>>>>>> f70bcabc1c8d86689e34f00fb0ac05c95ea186aa
  </Routes>
}
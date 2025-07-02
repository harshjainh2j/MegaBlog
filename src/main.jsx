import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Protected from './components/Protected.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AllPostsPage from './pages/AllPostsPage.jsx'
import AddPostPage from './pages/AddPostPage.jsx'
import EditPostPage from './pages/EditPostPage.jsx'
import PostPage from './pages/PostPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path:'/',
        element:<HomePage/>
      },
      {
        path:'/login',
        element:(
          <Protected authenticated={false}>
            <LoginPage/>
          </Protected>
        )
      },
      {
        path:'/signup',
        element:(
          <Protected authenticated={false}>
            <SignupPage/>
          </Protected>
        )
      },
      {
        path:'/all-posts',
        element:(
          <Protected authenticated={true}>
            <AllPostsPage/>
          </Protected>
        )
      },
      {
        path:'/add-posts',
        element:(
          <Protected authenticated={true}>
            <AddPostPage/>
          </Protected>
        )
      },
      {
        path:'/edit-post/:slug',
        element:(
          <Protected authenticated={true}>
            <EditPostPage/>
          </Protected>
        )
      },
      {
        path:'/post/:slug',
        element:(
          <Protected authenticated={true}>
            <PostPage/>
          </Protected>
        )
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
    <RouterProvider router={router}>
    <App />
   </RouterProvider>
   </Provider>
   
  </StrictMode>,
)

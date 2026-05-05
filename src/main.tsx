import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import CustomerList from './components/CustomerList.tsx'
import TrainingList from './components/TrainingList.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([  
  {
    path: "/",
    element: <App />,
    children: [                     
      {
        element: <CustomerList />,
        index: true                   
      },
      {
        path: "trainings",                
        element: <TrainingList />,
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
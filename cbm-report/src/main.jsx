import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import App from './App';

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import store from './redux/store'; // Ensure correct path

// import App from './App';

// const container = document.getElementById('root');
// const root = createRoot(container);

// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );




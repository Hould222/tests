import React from 'react';
import '@ant-design/v5-patch-for-react-19';
import ReactDOM from 'react-dom/client'; 
import { Provider } from 'react-redux';
import { store } from './store.ts';
import './index.css'
import App from './App.tsx';


const root = ReactDOM.createRoot(document.getElementById('app-root') as HTMLElement);


root.render(
    <Provider store={store}>
        <App />
    </Provider>
);


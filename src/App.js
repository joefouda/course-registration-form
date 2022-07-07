import 'antd/dist/antd.css';
import './App.css';
import Home from './components/Home/Home';
import { notification } from 'antd'
import { createContext  } from 'react'

export const NotificationContext = createContext([])

const openNotification = (eMessage) => {
  notification.error({
      message: eMessage,
      placement: 'topLeft'
  });
};

function App() {
  return (
    <NotificationContext.Provider value={{ openNotification }}>
      <Home />
    </NotificationContext.Provider>
  )
}

export default App;

import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/redux/store.ts'
import { StrictMode } from 'react'
import { initHistory } from './utils/History.ts'

const root = createRoot(document.getElementById('root')!)
root.render(
    <StrictMode>
        <Provider store={store}>
            <App history={initHistory(store)}/>
        </Provider>
    </StrictMode>,
)

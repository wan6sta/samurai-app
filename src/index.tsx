import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import Layot from './components/Layot'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<Layot>
		<App />
	</Layot>
)

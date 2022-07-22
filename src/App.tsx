import { FC } from 'react'
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation'
import Main from './pages/Main/Main'

const App: FC = () => {
	return (
		<div className="app">
			<Header />
			<div className="main">
				<Navigation />
				<Main />
			</div>
		</div>
	)
}

export default App

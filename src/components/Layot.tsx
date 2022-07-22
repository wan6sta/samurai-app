import { FC, ReactNode } from 'react'
import { setupStore } from '../store/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

interface IProps {
	children: ReactNode
}

const store = setupStore()

const Layot: FC<IProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<BrowserRouter>{children}</BrowserRouter>
		</Provider>
	)
}

export default Layot

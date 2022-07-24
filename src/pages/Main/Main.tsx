import styles from './main.module.scss'
import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from '../Profile/Profile'
import Chat from '../Chat/Chat'
import Users from '../Users/Users'
import Login from '../Login/Login'
import ProfileSettings from '../ProfileSettings/ProfileSettings'

const Main: FC = () => {
	return (
		<div className={styles.main}>
			<Routes>
				<Route path="/profile/:id" element={<Profile />} />
				<Route path="/users" element={<Users />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/profile/settings" element={<ProfileSettings />} />
				<Route path="*" element={<Profile />} />

				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	)
}

export default Main

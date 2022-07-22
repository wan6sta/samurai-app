import { FC } from 'react'
import styles from './navigation.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { useDispatch } from 'react-redux'
import { setAuthUserSignOut } from '../../store/reducers/authSlice/authSlice-actions'
import { profilePageSlice } from '../../store/reducers/profilePageSlice/ProfilePageSlice'

const Navigation: FC = () => {
	const navigate = useNavigate()
	const { isLogin, error, isLoading, authUser } = useAppSelector(
		(state) => state.authReducer
	)
	const dispatch = useDispatch<any>()

	const authUserSignOutHandler = () => {
		dispatch(setAuthUserSignOut())
		dispatch(dispatch(profilePageSlice.actions.deleteUserInfo()))
		navigate('/login', { replace: true })
	}

	return (
		<div className={styles.nav}>
			<ul className={styles.list}>
				<li className={styles.item}>
					<NavLink
						className={({ isActive }) =>
							isActive ? styles.activeLink : undefined
						}
						to={`/profile/${authUser.id}`}
					>
						Profile
					</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink
						className={({ isActive }) =>
							isActive ? styles.activeLink : undefined
						}
						to="/users"
					>
						Users
					</NavLink>
				</li>
				<li className={styles.item}>
					<NavLink
						className={({ isActive }) =>
							isActive ? styles.activeLink : undefined
						}
						to="/chat"
					>
						Chat
					</NavLink>
				</li>
				{isLogin && (
					<li onClick={authUserSignOutHandler} className={styles.signOut}>
						Sign out
					</li>
				)}
			</ul>
		</div>
	)
}

export default Navigation

import { FC, useEffect, useState } from 'react'
import styles from './header.module.scss'
import userIcon from '../../assets/images/user2.png'
import reactIcon from '../../assets/images/reactIcon.svg'
import { useAppSelector } from '../../hooks/redux'
import { useDispatch } from 'react-redux'
import {
	setAuthUser,
	setAuthUserSignOut
} from '../../store/reducers/authSlice/authSlice-actions'
import { NavLink, useNavigate } from 'react-router-dom'
import { setAuthUserMoreInfo } from '../../store/reducers/profilePageSlice/ProfilePage-actions'
import bar from '../../assets/images/bar.png'
import { profilePageSlice } from '../../store/reducers/profilePageSlice/ProfilePageSlice'

const Header: FC = () => {
	const dispatch = useDispatch<any>()
	const [displayBar, setDisplayBar] = useState(false)

	const { error, isLoading, authUser, isLogin } = useAppSelector(
		state => state.authReducer
	)
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(setAuthUser())
	}, [])

	useEffect(() => {
		if (isLogin && authUser.id) {
			dispatch(setAuthUserMoreInfo(authUser.id))
		}
	}, [isLogin])

	function handleNavigate() {
		navigate(`/profile/${authUser.id}`, { replace: true })
	}

	const authUserSignOutHandler = () => {
		setDisplayBar(false)
		dispatch(setAuthUserSignOut())
		dispatch(dispatch(profilePageSlice.actions.deleteUserInfo()))
		navigate('/login', { replace: true })
	}

	return (
		<div className={styles.header}>
			<div className={styles.titleWrapWrap}>
				<div className={styles.titleWrap}>
					<img className={styles.reactIcon} src={reactIcon} alt='reactIcon' />
					<p className={styles.title}>Samurai</p>
				</div>
				<div className={styles.barWrap}>
					<div
						onClick={() => setDisplayBar(prev => !prev)}
						className={styles.barWrapWrap}
					>
						<img className={styles.bar} src={bar} alt='bar' />
					</div>

					{displayBar ? (
						<div className={styles.nav}>
							<ul className={styles.list}>
								<li
									onClick={() => setDisplayBar(false)}
									className={styles.item}
								>
									<NavLink
										className={({ isActive }) =>
											isActive ? styles.activeLink : undefined
										}
										to={`/profile/${authUser.id}`}
									>
										Profile
									</NavLink>
								</li>
								<li
									onClick={() => setDisplayBar(false)}
									className={styles.item}
								>
									<NavLink
										className={({ isActive }) =>
											isActive ? styles.activeLink : undefined
										}
										to='/users'
									>
										Users
									</NavLink>
								</li>
								<li
									onClick={() => setDisplayBar(false)}
									className={styles.item}
								>
									<NavLink
										className={({ isActive }) =>
											isActive ? styles.activeLink : undefined
										}
										to='/chat'
									>
										Chat
									</NavLink>
								</li>
								{isLogin && (
									<li
										onClick={authUserSignOutHandler}
										className={styles.signOut}
									>
										Sign out
									</li>
								)}
							</ul>
						</div>
					) : null}
				</div>
			</div>

			{isLogin && (
				<div onClick={handleNavigate} className={styles.userWrap}>
					<img src={userIcon} alt='avatar user' />
					<span>{authUser.login}</span>
				</div>
			)}
			{!isLogin && (
				<button
					onClick={() => navigate('/login', { replace: true })}
					className={styles.signInBtn}
				>
					Sign in
				</button>
			)}
		</div>
	)
}

export default Header

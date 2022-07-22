import { FC, useEffect } from 'react'
import styles from './header.module.scss'
import userIcon from '../../assets/images/user2.png'
import reactIcon from '../../assets/images/reactIcon.svg'
import { useAppSelector } from '../../hooks/redux'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../../store/reducers/authSlice/authSlice-actions'
import { useNavigate } from 'react-router-dom'
import { setAuthUserMoreInfo } from '../../store/reducers/profilePageSlice/ProfilePage-actions'

const Header: FC = () => {
	const dispatch = useDispatch<any>()
	const { error, isLoading, authUser, isLogin } = useAppSelector(
		(state) => state.authReducer
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

	return (
		<div className={styles.header}>
			<div className={styles.titleWrap}>
				<img className={styles.reactIcon} src={reactIcon} alt="reactIcon" />
				<p className={styles.title}>Samurai</p>
			</div>

			{isLogin && (
				<div onClick={handleNavigate} className={styles.userWrap}>
					<img src={userIcon} alt="avatar user" />
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

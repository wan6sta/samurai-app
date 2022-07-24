import { FC, useEffect, useRef, useState } from 'react'
import styles from './profile.module.scss'
import userIcon from '../../assets/images/user2.png'
import yesIcon from '../../assets/images/yes.png'
import noIcon from '../../assets/images/no.png'
import inst from '../../assets/images/instagram.png'
import vk from '../../assets/images/vk.png'
import github from '../../assets/images/github.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
	setStatus,
	setUserMoreInfo
} from '../../store/reducers/profilePageSlice/ProfilePage-actions'
import { useAppSelector } from '../../hooks/redux'
import Preloader from '../../components/ui/Preloader/Preloader'

const Profile: FC = () => {
	const { id } = useParams()
	const dispatch = useDispatch<any>()
	const { user, isLoading: isLoadingUser } = useAppSelector(
		state => state.profilePageReducer
	)
	const navigate = useNavigate()
	const { authUser } = useAppSelector(state => state.authReducer)
	const [inputVisible, setInputVisible] = useState<boolean>(true)
	const [inputStatusValue, setInputStatusValue] = useState<any>('')
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [currentAuthUser, setCurrentAuthUser] = useState(false)

	useEffect(() => {
		if (!authUser.login) {
			return
		}
		dispatch(setUserMoreInfo(Number(id)))
	}, [id])

	useEffect(() => {
		if (!authUser.login) {
			navigate('/login', { replace: true })
		}
	}, [authUser.login])

	useEffect(() => {
		if (id == authUser.id) {
			setCurrentAuthUser(true)
			return
		}
		setCurrentAuthUser(false)
	}, [user?.userId, user?.status, user])

	useEffect(() => {
		if (user?.status) {
			setInputStatusValue(user?.status)
		}
	}, [user?.status])

	const handleInputStatus = () => {
		setInputVisible(true)
		if (inputStatusValue && inputStatusValue !== user?.status) {
			dispatch(setStatus(inputStatusValue))
		}
	}

	if (isLoadingUser) {
		return <Preloader />
	}

	return (
		<div className={styles.profilePage}>
			{user ? (
				<div className={styles.cardUser}>
					<div className={styles.cardUserTitle}>
						<img
							src={user?.photos.large ? user?.photos.large : userIcon}
							alt='avatar'
						/>
						<div className={styles.profileInfo}>
							<span className={styles.name}>{user?.fullName}</span>
							<span>{user?.aboutMe}</span>
						</div>

						<div className={styles.status}>
							{!currentAuthUser ? (
								<>
									<span className={styles.statusTitle}>Status: </span>
									<span
										style={{ cursor: 'text' }}
										className={styles.statusMain}
									>
										{user?.status}
									</span>
								</>
							) : (
								<>
									<span className={styles.statusTitle}>Status: </span>
									<span
										hidden={!inputVisible}
										onClick={() => {
											inputRef.current?.focus()
											setInputVisible(false)
										}}
										className={styles.statusMain}
									>
										{user?.status}
									</span>
									<div hidden={inputVisible}>
										<input
											ref={inputRef}
											onChange={e => setInputStatusValue(e.target.value)}
											onBlur={handleInputStatus}
											value={inputStatusValue}
											autoFocus={true}
											className={styles.statusInput}
											type='text'
										/>
										<button
											className={styles.buttonStatus}
											onClick={handleInputStatus}
										>
											Change
										</button>
									</div>
								</>
							)}
						</div>

						<div className={styles.lookingForAJobWrap}>
							<div className={styles.lookingForAJob}>
								<span>Looking for a job</span>
								<img src={user?.lookingForAJob ? yesIcon : noIcon} alt='icon' />
							</div>
							<span>{user?.lookingForAJobDescription}</span>
						</div>
						<div className={styles.contacts}>
							{user?.contacts.instagram ? (
								<a target='_blank' href={`https://${user?.contacts.instagram}`}>
									<img src={inst} alt='inst' />
								</a>
							) : null}
							{user?.contacts.vk ? (
								<a target='_blank' href={`https://${user?.contacts.vk}`}>
									<img src={vk} alt='vk' />
								</a>
							) : null}
							{user?.contacts.github ? (
								<a target='_blank' href={`https://${user?.contacts.github}`}>
									<img src={github} alt='github' />
								</a>
							) : null}
						</div>
					</div>
					{currentAuthUser ? (
						<Link className={styles.profileSettings} to='/profile/settings'>
							Change profile settings{' '}
						</Link>
					) : null}
				</div>
			) : (
				<div className={styles.notFound}>User not found</div>
			)}
		</div>
	)
}

export default Profile

import { FC, useEffect } from 'react'
import styles from './profile.module.scss'
import userIcon from '../../assets/images/user2.png'
import yesIcon from '../../assets/images/yes.png'
import noIcon from '../../assets/images/no.png'
import inst from '../../assets/images/instagram.png'
import vk from '../../assets/images/vk.png'
import github from '../../assets/images/github.png'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserMoreInfo } from '../../store/reducers/profilePageSlice/ProfilePage-actions'
import { useAppSelector } from '../../hooks/redux'

const Profile: FC = () => {
	const { id } = useParams()
	const dispatch = useDispatch<any>()
	const { user } = useAppSelector((state) => state.profilePageReducer)
	const { authUser } = useAppSelector((state) => state.authReducer)

	useEffect(() => {
		dispatch(setUserMoreInfo(Number(id)))
	}, [id])

	return (
		<div className={styles.profilePage}>
			{user ? (
				<div className={styles.cardUser}>
					<div className={styles.cardUserTitle}>
						<img
							src={user?.photos.large ? user?.photos.large : userIcon}
							alt="avatar"
						/>
						<div className={styles.profileInfo}>
							<span className={styles.name}>{user?.fullName}</span>
							<span>{user?.aboutMe}</span>
						</div>

						<div className={styles.status}>
							<span className={styles.statusTitle}>Status: </span>
							<span>{user?.status}</span>
						</div>

						<div className={styles.lookingForAJobWrap}>
							<div className={styles.lookingForAJob}>
								<span>Looking for a job</span>
								<img src={user?.lookingForAJob ? yesIcon : noIcon} alt="icon" />
							</div>
							<span>{user?.lookingForAJobDescription}</span>
						</div>
						<div className={styles.contacts}>
							{user?.contacts.instagram ? (
								<a target="_blank" href={`https://${user?.contacts.instagram}`}>
									<img src={inst} alt="inst" />
								</a>
							) : null}
							{user?.contacts.vk ? (
								<a target="_blank" href={`https://${user?.contacts.vk}`}>
									<img src={vk} alt="vk" />
								</a>
							) : null}
							{user?.contacts.github ? (
								<a target="_blank" href={`https://${user?.contacts.github}`}>
									<img src={github} alt="github" />
								</a>
							) : null}
						</div>
					</div>
				</div>
			) : (
				<div className={styles.notFound}>User not found</div>
			)}
		</div>
	)
}

export default Profile

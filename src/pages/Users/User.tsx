import { FC } from 'react'
import { IUsersItem } from '../../models/IUsersItem'
import iconUser from '../../assets/images/user2.png'
import styles from './user.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserFollowOrUnfollow } from '../../store/reducers/usersSlice/users-actions'

interface IProps {
	user: IUsersItem
}

const User: FC<IProps> = ({ user }) => {
	const dispatch = useDispatch<any>()

	return (
		<div className={styles.userCard}>
			<div className={styles.imgAndButton}>
				<Link to={`/profile/${user.id}`}>
					<img
						src={user.photos.small ? user.photos.small : iconUser}
						alt='logo'
					/>
				</Link>
				{user.followed ? (
					<button
						onClick={() =>
							dispatch(setUserFollowOrUnfollow('unfollow', user.id))
						}
					>
						Unfollow
					</button>
				) : (
					<button
						onClick={() => dispatch(setUserFollowOrUnfollow('follow', user.id))}
					>
						Follow
					</button>
				)}
			</div>
			<div className={styles.userNameStatus}>
				<span>{user.name}</span>
				{user.status}
			</div>
		</div>
	)
}

export default User

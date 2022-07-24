import { FC, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	setUsersPagination,
	setUsersWithFilter
} from '../../store/reducers/usersSlice/users-actions'
import { useAppSelector } from '../../hooks/redux'
import User from './User'
import styles from './user.module.scss'
import Preloader from '../../components/ui/Preloader/Preloader'
import { useDebounce } from '../../hooks/useDebounce'
import { useNavigate } from 'react-router-dom'

const Users: FC = () => {
	const dispatch = useDispatch<any>()
	const [count, setCount] = useState(40)
	let [page, setPage] = useState(1)
	const [term, setTerm] = useState('')
	const [isFriend, setIsFriend] = useState(false)
	const { isLoading, users } = useAppSelector(state => state.pageUsersReducer)
	const lastElement = useRef<HTMLDivElement | null>(null)
	const observer = useRef<IntersectionObserver>()
	const navigate = useNavigate()
	const { authUser } = useAppSelector(state => state.authReducer)

	useEffect(() => {
		if (!authUser.login) {
			navigate('/login', { replace: true })
		}
	}, [authUser.login])

	const debounce = useDebounce(term)

	useEffect(() => {
		if (!authUser.login) {
			return
		}
		dispatch(setUsersWithFilter(count, 1, debounce, isFriend))
	}, [debounce, isFriend])

	useEffect(() => {
		if (!authUser.login) {
			return
		}
		if (isLoading) return
		if (observer.current) observer.current?.disconnect()

		const callback = (entries: any[], observer: any) => {
			if (debounce || isFriend) return

			if (entries[0].isIntersecting) {
				const pageCurrent = page + 1
				setPage(page + 1)
				//console.log(pageCurrent)
				dispatch(setUsersPagination(count, pageCurrent, debounce, isFriend))
			}
		}
		observer.current = new IntersectionObserver(callback)
		if (lastElement.current) {
			observer.current?.observe(lastElement.current)
		}
	}, [lastElement.current, isLoading, page])

	return (
		<div className={styles.usersPage}>
			{isLoading ? <Preloader /> : null}
			<div className={styles.form}>
				<input
					autoFocus={true}
					value={term}
					onChange={e => setTerm(e.target.value)}
					type='text'
					placeholder='Find user'
				/>
				<div className={styles.friend}>
					<label htmlFor='friendCheckbox'>Show friends</label>
					<input
						id='friendCheckbox'
						checked={isFriend}
						onChange={() => setIsFriend(prev => !prev)}
						type='checkbox'
					/>
				</div>
			</div>
			<div className={styles.usersWrapper}>
				{users.map(user => (
					<User key={user.id} user={user} />
				))}
			</div>
			<div
				ref={lastElement}
				style={{ height: 0, backgroundColor: 'black' }}
			></div>
		</div>
	)
}

export default Users

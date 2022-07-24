import React, { useEffect } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import styles from './profileSettings.module.scss'
import { useDispatch } from 'react-redux'
import { setProfileInfo } from '../../store/reducers/profilePageSlice/ProfilePage-actions'

const validate = (values: any) => {
	const errors: any = {}
	if (!values.lookingForAJobDescription) {
		errors.lookingForAJobDescription = 'Required'
	}

	if (!values.fullName) {
		errors.fullName = 'Required'
	}

	if (!values.github) {
		errors.github = 'Required'
	}

	if (!values.vk) {
		errors.vk = 'Required'
	}

	if (!values.instagram) {
		errors.instagram = 'Required'
	}
	if (!values.AboutMe) {
		errors.AboutMe = 'Required'
	}

	return errors
}

const ProfileSettings = () => {
	const naviagte = useNavigate()
	const { isLogin, authUser } = useAppSelector(state => state.authReducer)
	const { authUser: authUserMoreInfo } = useAppSelector(
		state => state.profilePageReducer
	)
	const navigate = useNavigate()
	const dispatch = useDispatch<any>()

	useEffect(() => {
		if (!isLogin) {
			navigate(`/login`, { replace: true })
		}
	}, [isLogin])

	const lookingForAJobDescription = authUserMoreInfo?.lookingForAJobDescription
		? authUserMoreInfo?.lookingForAJobDescription
		: ''
	const githubText = authUserMoreInfo?.contacts.github
		? authUserMoreInfo?.contacts.github
		: ''
	const vkText = authUserMoreInfo?.contacts.vk
		? authUserMoreInfo?.contacts.vk
		: ''
	const instText = authUserMoreInfo?.contacts.instagram
		? authUserMoreInfo?.contacts.instagram
		: ''
	const formik = useFormik({
		initialValues: {
			lookingForAJob: authUserMoreInfo?.lookingForAJob,
			lookingForAJobDescription: lookingForAJobDescription,
			fullName: authUserMoreInfo?.fullName,
			github: githubText,
			vk: vkText,
			AboutMe: authUserMoreInfo?.aboutMe,
			instagram: instText
		},
		validate,
		onSubmit: values => {
			const userInfo = {
				id: authUser.id,
				lookingForAJob: values.lookingForAJob,
				lookingForAJobDescription: values.lookingForAJobDescription,
				fullName: values.fullName,
				AboutMe: values.AboutMe,
				contacts: {
					instagram: values.instagram,
					vk: values.vk,
					github: values.github
				}
			}
			dispatch(setProfileInfo(userInfo))

			naviagte(`/profile/${authUserMoreInfo?.userId}`, { replace: true })
		}
	})

	return (
		<div className={styles.formInfoProfile}>
			<form onSubmit={formik.handleSubmit}>
				<div className={styles.lookingJob}>
					<label htmlFor='lookingForAJob'>Looking for a job</label>
					<input
						className={styles.rememberMe}
						id='lookingForAJob'
						name='lookingForAJob'
						type='checkbox'
						onChange={formik.handleChange}
						checked={formik.values.lookingForAJob}
					/>
				</div>

				<div className={styles.divLabelWrapper}>
					<label htmlFor='lookingForAJobDescription'>Description</label>
					<input
						id='lookingForAJobDescription'
						name='lookingForAJobDescription'
						type='text'
						onChange={formik.handleChange}
						value={formik.values.lookingForAJobDescription}
					/>
					{formik.errors.lookingForAJobDescription ? (
						<div className={styles.reqField}>The field is required*</div>
					) : null}
				</div>

				<div className={styles.divLabelWrapper}>
					<label htmlFor='fullName'>FullName</label>
					<input
						id='fullName'
						name='fullName'
						type='text'
						onChange={formik.handleChange}
						value={formik.values.fullName}
					/>
					{formik.errors.fullName ? (
						<div className={styles.reqField}>The field is required*</div>
					) : null}
				</div>

				<div className={styles.divLabelWrapper}>
					<label htmlFor='AboutMe'>About Me</label>
					<input
						id='AboutMe'
						name='AboutMe'
						type='text'
						onChange={formik.handleChange}
						value={formik.values.AboutMe}
					/>
					{formik.errors.AboutMe ? (
						<div className={styles.reqField}>The field is required*</div>
					) : null}
				</div>

				<div className={styles.divLabelWrapper}>
					<label htmlFor='github'>Git hub</label>
					<input
						id='github'
						name='github'
						type='text'
						onChange={formik.handleChange}
						value={formik.values.github}
					/>
					{formik.errors.github ? (
						<div className={styles.reqField}>The field is required*</div>
					) : null}
				</div>

				<div className={styles.divLabelWrapper}>
					<label htmlFor='vk'>VK</label>
					<input
						id='vk'
						name='vk'
						type='text'
						onChange={formik.handleChange}
						value={formik.values.vk}
					/>
					{formik.errors.vk ? (
						<div className={styles.reqField}>The field is required*</div>
					) : null}
				</div>

				<div className={styles.divLabelWrapper}>
					<label htmlFor='instagram'>Instagram</label>
					<input
						id='instagram'
						name='instagram'
						type='text'
						onChange={formik.handleChange}
						value={formik.values.instagram}
					/>
					{formik.errors.instagram ? (
						<div className={styles.reqField}>The field is required*</div>
					) : null}
				</div>

				<button type='submit'>Change</button>
			</form>
		</div>
	)
}

export default ProfileSettings

import { IUserMoreInfo } from '../../../models/IUser'
import { AppDispatch } from '../../store'
import { profilePageSlice } from './ProfilePageSlice'
import { axiosSocial } from '../../../api/axios'

interface IUserFetching {
	data: IUserMoreInfo
	fieldErrors: []
	messages: []
	resultCode: number
}

export const setAuthUserMoreInfo =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			dispatch(profilePageSlice.actions.setIsLoading(true))
			const data = await axiosSocial.get(`/profile/${id}`, {
				withCredentials: true,
				headers: { 'API-KEY': '4c455b41-e9e2-41e3-8498-c52fd2cfffdc' }
			})
			if (data.status === 200) {
				dispatch(profilePageSlice.actions.setAuthUserMoreInfo(data.data))
				dispatch(profilePageSlice.actions.setIsLoading(false))
				dispatch(profilePageSlice.actions.setError(''))
				return
			}
			dispatch(profilePageSlice.actions.setError('some error'))
			dispatch(profilePageSlice.actions.setIsLoading(false))
		} catch (e: any) {
			dispatch(profilePageSlice.actions.setError(e.message))
		}
	}

export const setUserMoreInfo =
	(id: number) => async (dispatch: AppDispatch) => {
		try {
			dispatch(profilePageSlice.actions.setIsLoading(true))
			const data = await axiosSocial.get(`/profile/${id}`, {
				withCredentials: true,
				headers: { 'API-KEY': '4c455b41-e9e2-41e3-8498-c52fd2cfffdc' }
			})
			if (data.status === 200) {
				dispatch(profilePageSlice.actions.setUserProfile(data.data))
				dispatch(profilePageSlice.actions.setIsLoading(false))
				dispatch(profilePageSlice.actions.setError(''))

				const { data: status } = await axiosSocial.get(`/profile/status/${id}`)
				dispatch(profilePageSlice.actions.setUserStatus(status))
				return
			}

			dispatch(profilePageSlice.actions.setError('some error'))
			dispatch(profilePageSlice.actions.setIsLoading(false))
		} catch (e: any) {
			dispatch(profilePageSlice.actions.setError(e.message))
		}
	}

export const setStatus = (status: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(profilePageSlice.actions.setIsLoading(true))
		const data = await axiosSocial.put(
			`/profile/status`,
			{
				status
			},
			{
				withCredentials: true,
				headers: { 'API-KEY': '4c455b41-e9e2-41e3-8498-c52fd2cfffdc' }
			}
		)
		if (data.status === 200) {
			dispatch(profilePageSlice.actions.setUserStatus(status))
			dispatch(profilePageSlice.actions.setIsLoading(false))
			dispatch(profilePageSlice.actions.setError(''))
			return
		}

		dispatch(profilePageSlice.actions.setError('some error'))
		dispatch(profilePageSlice.actions.setIsLoading(false))
	} catch (e: any) {
		dispatch(profilePageSlice.actions.setError(e.message))
	}
}

export const setProfileInfo =
	(userInfo: any) => async (dispatch: AppDispatch) => {
		try {
			dispatch(profilePageSlice.actions.setIsLoading(true))
			const data = await axiosSocial.put(
				`/profile`,
				{
					userId: userInfo.id,
					AboutMe: userInfo.AboutMe,
					lookingForAJob: userInfo.lookingForAJob,
					lookingForAJobDescription: userInfo.lookingForAJobDescription,
					fullName: userInfo.fullName,
					contacts: {
						instagram: userInfo.instagram,
						vk: userInfo.vk,
						github: userInfo.github,
						facebook: '',
						twitter: '',
						website: '',
						youtube: '',
						mainLink: ''
					}
				},
				{
					withCredentials: true,
					headers: { 'API-KEY': '4c455b41-e9e2-41e3-8498-c52fd2cfffdc' }
				}
			)
			if (data.status === 200) {
				dispatch(setUserMoreInfo(userInfo.id))
				dispatch(profilePageSlice.actions.setIsLoading(false))
				dispatch(profilePageSlice.actions.setError(''))
				return
			}

			dispatch(profilePageSlice.actions.setError('some error'))
			dispatch(profilePageSlice.actions.setIsLoading(false))
		} catch (e: any) {
			dispatch(profilePageSlice.actions.setError(e.message))
		}
	}

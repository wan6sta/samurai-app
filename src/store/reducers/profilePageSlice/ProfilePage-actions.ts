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
			const data = await axiosSocial.get(`/profile/${id}`)
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
			const data = await axiosSocial.get(`/profile/${id}`)
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

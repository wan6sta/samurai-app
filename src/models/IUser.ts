interface Contacts {
	facebook: string
	website?: any
	vk: string
	twitter: string
	instagram: string
	youtube?: any
	github: string
	mainLink?: any
}

interface Photos {
	small: string
	large: string
}

export interface IUserMoreInfo {
	aboutMe: string
	contacts: Contacts
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	userId: number
	photos: Photos
	status?: string
}

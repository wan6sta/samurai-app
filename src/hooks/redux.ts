import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../store/store'

//export const useAppDispatch = useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

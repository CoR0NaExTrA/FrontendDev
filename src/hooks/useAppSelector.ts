import { TypedUseSelectorHook, useSelector } from "react-redux";
import { EditorReducer } from "../store/redux/EditorReducer";

type RootState = ReturnType<typeof EditorReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
    useAppSelector
}
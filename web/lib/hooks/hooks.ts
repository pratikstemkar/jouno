import { AppDispatch, AppStore, RootState } from "../store";
import { useDispatch, useSelector, useStore } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

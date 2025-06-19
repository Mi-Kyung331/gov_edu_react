import { create } from "zustand";

// export const useRefreshStore = create((set) => ({
//     isRefresh: true,
//     refresh: () => set(state => ({isRefresh: true})),
//     reset: () => set(state => ({isRefresh: false})),
// }));

// snippet으로 빼놓았기 때문에 zs로 바로 꺼내쓸 수 있다.
export const useRefreshStore = create((setter) => ({
    value: true,
    setValue: (callback) => setter(state => ({value: callback(state)})),
}));


// 예시
// useState()처럼 공통으로 사용할 수 있다.
export const useGlobalStateStore = create((set) => ({
    name: "강미경",
    setName: (newName) => set(state => ({name: newName})),
    setNmae2: () => set(state => ({name: state.name + "님"})),
}));


import { create } from 'zustand'


interface TestState {
    test: string
}

export const useTestStore = create<TestState>()((set) => ({
    test: "test"
}))
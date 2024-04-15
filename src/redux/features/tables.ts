import { ClaimDataI } from "@/src/models/ClaimData.interface"
import { createSlice } from "@reduxjs/toolkit"

interface StateTables {
    exposureTable: ClaimDataI[]
    policyTable: ClaimDataI[],
    jsonText: string
}

const initialState: StateTables = {
    exposureTable: [],
    policyTable: [],
    jsonText: ''
}

export const tablesSlice = createSlice({
    name: "tables",
    initialState,
    reducers: {
        setExposureTable: (state, action) => {
            state.exposureTable = action.payload
        },
        setPolicyTable: (state, action) => {
            state.policyTable = action.payload
        },
        setJsonText: (state, action) => {
            state.jsonText = action.payload
        }
    }
})

export const { setExposureTable, setPolicyTable, setJsonText } = tablesSlice.actions

export default tablesSlice.reducer

export const selectExposureTable = (state: StateTables) => state.exposureTable
export const selectPolicyTable = (state: StateTables) => state.policyTable
export const jsonText = (state: StateTables) => state.jsonText
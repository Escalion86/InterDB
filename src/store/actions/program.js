import {
  LOAD_PROGRAMS,
  ADD_PROGRAM,
  UPDATE_PROGRAM,
  UPDATE_PROGRAM_PARTIALLY,
  LOADING_PROGRAMS,
  DELETE_PROGRAM,
  DELETE_ALL_PROGRAMS,
  DELETING_PROGRAM,
  LOADING_PROGRAM,
  LOADING_PROGRAM_COMPLITE,
} from "../types"
import { DB } from "../../db/db"

export const loadPrograms = () => {
  return async (dispatch) => {
    const programs = await DB.getTableData("programs")
    dispatch({
      type: LOAD_PROGRAMS,
      programs,
    })
  }
}

export const loadingPrograms = () => {
  return {
    type: LOADING_PROGRAMS,
  }
}

export const loadingProgram = (id) => {
  return {
    type: LOADING_PROGRAM,
    id,
  }
}

export const deletingProgram = (id) => {
  return {
    type: DELETING_PROGRAM,
    id,
  }
}

export const loadingProgramComplite = (id) => {
  return {
    type: LOADING_PROGRAM_COMPLITE,
    id,
  }
}

export const addProgram = (program) => {
  return async (dispatch) => {
    await dispatch(loadingPrograms())
    const programId = await DB.addProgram(program)
    program.id = programId
    dispatch({
      type: ADD_PROGRAM,
      program,
    })
  }
}

export const updateProgram = (program) => {
  return async (dispatch) => {
    await dispatch(loadingProgram(program.id))
    await DB.updateProgram(program)
    dispatch({
      type: UPDATE_PROGRAM,
      program,
    })
  }
}
//TODO Заменить этой функцией функции такие как setProgramStatus, setFinanceStatus
export const updateProgramPartially = (id, parts) => {
  return async (dispatch) => {
    await dispatch(loadingProgram(id))
    await DB.updateDataTablePartially("programs", id, parts)
    dispatch({
      type: UPDATE_PROGRAM_PARTIALLY,
      id,
      parts,
    })
  }
}

export const deleteAllPrograms = () => {
  return async (dispatch) => {
    await dispatch(loadingPrograms())
    await DB.deleteAllDataFromTable("programs")
    dispatch({
      type: DELETE_ALL_PROGRAMS,
    })
  }
}

export const deleteProgram = (id) => {
  return async (dispatch) => {
    await dispatch(deletingProgram(id))
    await DB.deleteDataFromTable("programs")
    dispatch({
      type: DELETE_PROGRAM,
      id,
    })
  }
}

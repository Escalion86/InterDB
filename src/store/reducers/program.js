import {
  LOAD_PROGRAMS,
  ADD_PROGRAM,
  UPDATE_PROGRAM,
  LOADING,
  DELETE_PROGRAM,
  DELETE_ALL_PROGRAMS,
  DELETING_PROGRAM,
  LOADING_PROGRAM,
  LOADING_PROGRAM_COMPLITE,
  UPDATE_PROGRAM_PARTIALLY,
} from "../types"

const initialState = {
  programs: [],
  loading: true,
}

let programs

export const programReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROGRAMS:
      programs = action.programs.map((program) => {
        program.loading = false
        return program
      })

      return {
        ...state,
        programs,
        loading: false,
      }
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    case LOADING_PROGRAM:
      programs = state.programs.map((program) => {
        if (program.id === action.id) {
          program.loading = true
        }
        return program
      })

      return {
        ...state,
        programs,
      }
    case LOADING_PROGRAM_COMPLITE:
      programs = state.programs.map((program) => {
        if (program.id === action.id) {
          program.loading = false
          program.deleting = false
        }
        return program
      })

      return {
        ...state,
        programs,
      }
    case ADD_PROGRAM:
      return {
        ...state,
        loading: false,
        programs: [{ ...action.program, loading: false }, ...state.programs],
      }
    case DELETE_ALL_PROGRAMS:
      return {
        ...state,
        loading: false,
        programs: [],
      }
    case DELETE_PROGRAM:
      return {
        ...state,
        programs: state.programs.filter((program) => program.id !== action.id),
      }

    case DELETING_PROGRAM:
      programs = state.programs.map((program) => {
        if (program.id === action.id) {
          program.deleting = true
        }
        return program
      })

      return {
        ...state,
        programs,
      }

    case UPDATE_PROGRAM:
      programs = state.programs.map((program) => {
        if (program.id === action.program.id) {
          program = { ...program, ...action.program, loading: false }
        }
        return program
      })

      return {
        ...state,
        programs,
      }

    case UPDATE_PROGRAM_PARTIALLY: //action (id, parts)
      programs = state.programs.map((program) => {
        if (program.id === action.id) {
          program = { ...program, ...action.parts, loading: false }
        }
        return program
      })

      return {
        ...state,
        programs,
      }

    default:
      return state
  }
}

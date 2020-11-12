import store from '../store'

const isDeveloper = () => {
  return store.getState().app.dev && store.getState().user.tariff === 4
}

export default isDeveloper

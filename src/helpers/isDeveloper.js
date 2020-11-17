const isDeveloper = (user = { dev: false }, app = { tariff: 0 }) => {
  return app.dev && user.tariff === 4
}

export default isDeveloper

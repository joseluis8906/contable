export const state = {
  Fecha: null,
  FechaInicial: null,
  FechaFinal: null
}

export const mutations = {
  changeFecha (state, Fecha) {
    state.Fecha = Fecha
  },
  changeFechaInicial (state, FechaInicial) {
    state.FechaInicial = FechaInicial
  },
  changeFechaFinal (state, FechaFinal) {
    state.FechaFinal = FechaFinal
  }
}

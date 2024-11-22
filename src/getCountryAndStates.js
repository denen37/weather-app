import country_states from './country-states'

let countries = Object.entries(country_states.country).map((item) => {
    return { code: item[0], country: item[1] }
})

const getStates = () => {

    let states = Object.entries(country_states.states).map(item => {
        return { country_code: item[0], states: item[1] }
    })

    let allStates = []

    states.forEach((item) => {
        let count_code = item.country_code;

        item.states.forEach(state => {
            allStates.push({ country_code: count_code, state: state.name, state_code: state.code });
        })

    })

    return allStates
}

const getCountryByCode = (code) => {
    return countries.find((item) => item.code === code)
}

let statesAndCountries = getStates().map(state => {
    return {
        state: state.state,
        country: getCountryByCode(state.country_code)?.country
    }
})

export default statesAndCountries

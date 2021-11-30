const ComponentGenerator = require("../SharedUtils/ComponentGenerator")
const axios = require('axios')
const Constants = require('../Constants')

const SpecialKeyWords = {
    date: ['date', 'dob', 'expire'],
    time: ['time'],
    datetime: ['datetime'],
    radio: ['gender'],
    picker: ['year', 'month', 'weekday', 'day', 'states'],
}

const SpecialStatesHandler = {
    getClosestMeaningOfWord: async function (state, states) {
        //Find the closest meaning
        states = states.filter(e => e != state)
        let response = await axios.post(Constants.SearchBaseUrl, {
            "documents": states,
            "query": state
        }, { headers: {
                'Content-Type': 'text/json',
                'Authorization': `Bearer ${Constants.OpenAIAPIKey}`
            }
        })
        var closestMeaningWord = null;
        if (response["data"]) {
            var highestScore = response["data"][0]["score"]
            var index = 0
            for (var i = 0; i < response["data"].length; i++) {
                if (response["data"][i]["score"] > highestScore) {
                    console.log(response["data"][i]["score"]);
                    highestScore = response["data"][i]["score"]
                    index = i
                }
            }
            closestMeaningWord = states[index]
        }
        closestMeaningWord = closestMeaningWord || state
        //If we dont find any cloest meaning, we just return the state
        return closestMeaningWord
    },

    isSpecialState: function (state) {
        for (const property in SpecialKeyWords) {
            for (const keyword of property) {
                if (state.includes(keyword)) {
                    return { 'type': property, 'keyword': keyword }
                }
            }
        }
        return false
    },

    isUserCustomState: function (state) {
        return state.includes('-')
    },

    handleUserCustomState: function (stateString) {
        //The correct format of stateString must be: state name-type-names
        //For example: 
        //insurance-radio-primary-secondary-third
        //insurance-picker-primary-secondary-third
        var array = stateString.split('-')
        var code = null
        if (array.length > 2) {
            const state = array[0]
            const type = array[1]
            const items = array.slice(2)
            if (type.includes('picker')) {
                code = ComponentGenerator.createPicker(state, items)
            }
            else if (type.includes('radio')) {
                code = ComponentGenerator.createNativeBaseRadioInput(`Select ${state}`, items, state)
            }
            else if (type.includes('checkbox')) {
                code = ComponentGenerator.createNativeBaseCheckbox(state, items)
            }
            return code
        }
        return null
    },

    handleSpecialState: async function (state, states, type, keyword) {
        //The reason why we need all states is because we need to know some accessories state 
        //like isDateOfBirthPickerOpen
        if (type == 'date') {
            const closestMeaningWord = this.getClosestMeaningOfWord(state, states)
            return ComponentGenerator.createNativeBaseDateTimeInput(`Select ${state}`, `Pick ${state}`, 'date', state, closestMeaningWord)
        }
        else if (type == 'time') {
            const closestMeaningWord = this.getClosestMeaningOfWord(state, states)
            return ComponentGenerator.createNativeBaseDateTimeInput(`Select ${state}`, `Pick ${state}`, 'time', state, closestMeaningWord)
        }
        else if (type == 'datetime') {
            const closestMeaningWord = this.getClosestMeaningOfWord(state, states)
            return ComponentGenerator.createNativeBaseDateTimeInput(`Select ${state}`, `Pick ${state}`, 'datetime', state, closestMeaningWord)
        }
        else if (type == 'radio') {
            if (keyword == 'gender') {
                const genders = [{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }]
                return ComponentGenerator.createNativeBaseRadioInput('Select Gender', genders, state)
            }
        }
        else if (type == 'picker') {
            if (keyword == 'year') {
                const yearOptions = [...Array(90).keys()].map(year => year + 1930);
                return ComponentGenerator.createPicker(state, yearOptions)
            }
            else if (keyword == 'month') {
                const monthsOptions = [...Array(12).keys()].map(month => month + 1);
                return ComponentGenerator.createPicker(state, monthsOptions)
            }
            else if (keyword == 'weekday' || keyword == 'day') {
                const weekdaysOptions = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                return ComponentGenerator.createPicker(state, weekdaysOptions)
            }
            else if (keyword == 'states') {
                const usStates = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Minor Outlying Islands", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "U.S. Virgin Islands", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
                return ComponentGenerator.createPicker(state, usStates)
            }
        }
        return null
    }
}

module.exports = SpecialStatesHandler
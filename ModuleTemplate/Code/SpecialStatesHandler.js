const ComponentGenerator = required("../../SharedUtils/ComponentGenerator")
const axios = require('axios')
const Constants = require('../../Constants')

const SpecialKeyWords = {
    date: ['date', 'dob', 'expire'],
    time: ['time'],
    datetime: ['datetime'],
    radio: ['gender'],
    picker: ['year', 'month', 'weekday', 'day', 'state'],
}

const SpecialKeyWords = {
    getClosestMeaningOfWord: function (state, states) {
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
                    return {'type': property, 'keyword': keyword}
                }
            }
        }
        return false
    },

    handleSpecialState: async function (state, states, type) {
        //The reason why we need all states is because we need to know some accessories state 
        //like isDateOfBirthPickerOpen

        if (type == 'date') {
            const closestMeaningWord = this.getClosestMeaningOfWord(state, states)
            ComponentGenerator.createNativeBaseDateTimeInput(`Select ${state}`, `Pick ${state}`, 'date', state, closestMeaningWord)
        }
    }
}

module.exports = SpecialKeyWords
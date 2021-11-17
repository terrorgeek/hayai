const axios = require('axios');
const Constants = require('../Constants');
const CodexPresets = require('../CodexPresets');
module.exports = {
    extractStates: async function(input) {
        input = `${input}\nThe class name and the states are:`;
        const data = {
            "prompt": `${CodexPresets.statesPreset}${input}`,
            "temperature": 0.7,
            "max_tokens": 155,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "stop": ["\n"]
          }
        const options = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Constants.OpenAIAPIKey}`
            }
        }
        const res = await axios.post(`${Constants.CodexBaseUrl}`, data, options)
        return res.data;
    }
}
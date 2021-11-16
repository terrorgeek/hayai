const MedicationModule = {
    code: `
    import React from 'react';
import { View, Text } from 'react-native';

export default class Medication extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={{ flex: 1 }}>
            <Text>Wocao!</Text>
        </View>;
    }
}`

}

//export default MedicationModule;
module.exports = MedicationModule;
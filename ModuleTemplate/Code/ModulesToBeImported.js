module.exports = {
    DetailsTemplateModules: [
        `import * as React from 'react'`,
        `import { View } from 'react-native'`,
        `import { NavigationContainer } from '@react-navigation/native'`,
        `import axios from "axios"`,
        `import moment from 'moment'`,
        //`import Constants from "../../utils/Constants"`,
        //`import simpleStore from "react-native-simple-store"`,
        `import { Stack, HStack, VStack, Button, Input, Center, NativeBaseProvider, Radio, Checkbox, Text } from "native-base"`,
        `import RNPickerSelect from 'react-native-picker-select'`,
        `import DatePicker from 'react-native-date-picker'`
    ],
    IndexTemplateModules: [
        `import * as React from "react";`,
        `import { Box, Stack, Center, NativeBaseProvider, FlatList, Text} from "native-base";`
    ]
}
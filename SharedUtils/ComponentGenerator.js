const _ = require('lodash');

module.exports = {
    createNativeBaseInput: function (variant='outline', placeholder='Placeholder', state) {
        return `<Input variant="${variant}" placeholder="${placeholder}" value={this.state.${state}} onChangeText={text => this.setState({${state}: text}) } />`
    },

    createNativeBaseDateTimeInput: function(placeholder, buttonTitle, mode, stateDate, stateOpen) {
        return `
            <HStack space={3} alignItems="center">
                <Input variant="outline" placeholder="${placeholder}" value={this.state.${stateDate}.toString()} />
                <Button key={'md'} size={'md'} onPress={ () => this.setState({ ${stateOpen}: true }) }>
                    ${buttonTitle}
                </Button>
                <DatePicker
                    modal
                    mode='${mode}'
                    open={this.state.${stateOpen}}
                    date={this.state.${stateDate}}
                    onConfirm={(date) => {
                      this.setState({ ${stateDate}: date, ${stateOpen}: false });
                    }}
                    onCancel={() => {
                      this.setState({ ${stateOpen}: false });
                    }}
                />
            </HStack>`
    },

    createNativeBaseRadioInput: function (title, items, state) {
        return `
            <HStack space={3} alignItems="center">
                <Text>${title}: </Text>
                <Radio.Group
                    name="${title}"
                    accessibilityLabel="favorite number"
                    value={this.state.${state}}
                    onChange={(nextValue) => { this.setState({ ${state}: nextValue })}}
                >
                    <HStack space={3} alignItems="center">
                        ${items.map(item => {
                            return `<Radio value="${item}" my={1}>
                               ${item}
                            </Radio>`
                         }).join('\n')}
                    </HStack>
                </Radio.Group>
            </HStack>
        `
    },

    createNativeBaseCheckbox: function (state, items) {
        return ` <VStack space={6}>
                    <Text bold>${_.upperFirst(state)}:</Text>
                    ${items.map(item => {
                        return `<HStack space={3}>
                                    <Text>${item}</Text>
                                    <Checkbox value="${item}" onChange={(checked) => {
                                        var currentState = this.state.${state}
                                        currentState ||= {}
                                        if (checked) { currentState["${item}"] = true }
                                        else { currentState["${item}"] = false }
                                        this.setState({ ${state}: currentState })
                                    }} />
                                </HStack>`
                    }).join('\n')}
                </VStack>`
    },

    createNativeBaseButton: function (key, size='md', title='button') {
        if (key === null) key = size
        return `<Button key={'${key}'} size={'${size}'}>
                    ${title}
                </Button>`
    },

    createPicker: function (state, pickerOptions) {
        //pickerOptions is an array, for example: ['primary', 'secondary', 'third']
        return `<HStack space={5}>
              <Text>Select ${state}</Text>
              <RNPickerSelect
                  onValueChange={(value) => { this.setState({ ${state}: value }) }}
                  items={[${pickerOptions.map(item => {
                      return `{label: '${item}', value: '${item}'}`
                   }).join('\n,')}]}
              />
            </HStack>`
    }
}
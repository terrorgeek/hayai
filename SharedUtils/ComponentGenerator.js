module.exports = {
    createNativeBaseInput: function (variant='outline', placeholder='Placeholder') {
        return `<Input variant="${variant}" placeholder="${placeholder}" />`
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
            </HStack>
        `
    },

    createNativeBaseRadioInput: function (title, items, state) {
        //options should be like: 
        //[{label: 'Male', value: 'M'}, {label: 'Female', value: 'F'}, ......]
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
                            return `<Radio value="${item.value}" my={1}>
                               ${item.label}
                            </Radio>`
                         })}
                    </HStack>
                </Radio.Group>
            </HStack>
        `
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
              <Text>My Picker</Text>
              <RNPickerSelect
                  onValueChange={(value) => { this.setState({ ${state}: value }) }}
                  items={${pickerOptions.map(item => {
                      return `{label: '${item}', value: '${item}'}`
                   }).join('\n')}}
              />
            </HStack>`
    }
}
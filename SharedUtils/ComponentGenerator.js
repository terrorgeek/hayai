module.exports = {
    createNativeBaseInput: function (variant='outline', placeholder='Placeholder') {
        return `<Input variant="${variant}" placeholder="${placeholder}" />`
    },
    createNativeBaseButton: function (key, size = 'md', title='button') {
        if (key === null) key = size
        return `<Button key={'${key}'} size={'${size}'}>
                    ${title}
                </Button>`
    }
}
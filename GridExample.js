<ScrollView
                _contentContainerStyle={{
                  px: "20px",
                  mb: "4",
                  minW: "72",
                }}
              >
              <Stack space={3} alignItems="center">
                <Heading textAlign="center" mb="10">
                  HStack
                </Heading>
                <HStack space={3} alignItems="center">
                  <Center h="100px" w="100px" bg="primary.500" rounded="md" shadow={3} px='1'>Medications</Center>
                  <Center h="100px" w="100px" bg="secondary.500" rounded="md" shadow={3} />
                  <Center h="100px" w="100px" bg="emerald.500" rounded="md" shadow={3} />
                </HStack>
              </Stack>
            </ScrollView>
export const resolver = {
    Query: {
      loginScreen: () => ({
        email: "",
        password: "",
        error: "",
        __typename: 'LoginScreen'
      })
    },
    Mutation: {
      changeLoginScreenField: (_, { fieldName, value }, { cache }) => {
        const newFieldValue = {};
        newFieldValue[fieldName] = value;
        cache.writeData({ data: {loginScreen: newFieldValue}});
        return null;
      },
    }
  }
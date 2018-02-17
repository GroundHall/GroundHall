import gql from 'graphql-tag';

const resolver = {
  Query: {
    login: () => ({
      email: '',
      password: '',
      error: '',
      loading: false,
      __typename: 'login'
    }),
    authentication: () => ({
      email: '',
      firstName: '',
      lastName: '',
      type: '',
      __typename: 'authentication'
    })
  },
  Mutation: {
    changeLoginField: (_, { field, value }, { cache }) => {
      const nv = {
        __typename: 'login'
      };
      nv[field] = value;
      cache.writeData({ data: { login: nv } });
      return null;
    },
    toggleLoading: (_, args, { cache }) => {
      const query = gql`
        query {
          login @client {
            loading
          }
        }
      `;
      const previous = cache.readQuery({ query });
      const nextState = !previous.login.loading;
      cache.writeData({
        data: {
          login: {
            loading: nextState,
            __typename: 'login'
          }
        }
      });
      return null;
    },
    setAuthentication: (_, {
      email, firstName, lastName, type
    }, { cache }) => {
      cache.writeData(
        {
          data: {
            authentication: {
              email,
              firstName,
              lastName,
              type,
              __typename: 'authentication'
            }
          }
        });
    }
  }
};

export default resolver;

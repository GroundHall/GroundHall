import merge from 'lodash.merge';
import LoginScreenResolver from '../Login/resolver';
import ProgramTimelineResolver from '../Program/Timeline/resolver';

const resolvers = merge(
  LoginScreenResolver,
  ProgramTimelineResolver
);

export default resolvers;

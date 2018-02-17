import colors from '../../colors';

const resolver = {
  Query: {
    programTimeline: () => ({
      lineProps: {
        x1: 30,
        y1: 0,
        x2: 30,
        y2: 400,
        stroke: colors.secondary.medium,
        strokeWidth: 2,
        __typename: 'lineProps'
      },
      svgProps: {
        width: 50,
        height: 400,
        __typename: 'svgProps'
      },
      circleProps: {
        cx: 30,
        cy: 30,
        delta: 30,
        __typename: 'circleProps'
      },
      __typename: 'programTimeline'
    })
  },
  Mutation: {
    changeSVGHeight: (_, { value, nRecords }, { cache }) => {
      cache.writeData({
        data: {
          programTimeline: {
            lineProps: {
              y2: value,
              __typename: 'lineProps'
            },
            svgProps: {
              height: value,
              __typename: 'svgProps'
            },
            circleProps: {
              delta: value / (nRecords + 1),
              __typename: 'circleProps'
            },
            __typename: 'programTimeline'
          }
        }
      });
      return null;
    }
  }
};

export default resolver;

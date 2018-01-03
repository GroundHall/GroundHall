
import { StyleSheet } from 'react-native';
import colors from '../../colors';

const CIRCLE_BUTTON_WIDTH_HEIGHT = 50;
const CIRCLE_BUTTON_RADIUS = CIRCLE_BUTTON_WIDTH_HEIGHT / 2;

export default StyleSheet.create({
    flexed: {
        flex: 1
    },
    titleWrap: {
        marginTop: 75,
        marginLeft: 30,
        marginBottom: 30
    },
    title: {
        fontFamily: 'Lato-Black',
        fontSize: 26,
        color: colors.secondary.medium
    },
    buttonWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 40
    },
    button: {
        backgroundColor: colors.secondary.medium,
        borderRadius: CIRCLE_BUTTON_RADIUS,
        width: CIRCLE_BUTTON_WIDTH_HEIGHT,
        height: CIRCLE_BUTTON_WIDTH_HEIGHT,
        marginTop: -25,
        elevation: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputWrap: {
        height: 300,
        backgroundColor: colors.primary.light,
        marginHorizontal: 20,
        borderRadius: 5,
        elevation: 3,
        padding: 15,
        paddingTop: 40
    },
    orRegisterWrap: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    orWrap: {
        fontSize: 20,
        color: 'grey',
        fontFamily: 'Lato-Regular'
    },
    registerText: {
        fontSize: 22,
        color: colors.secondary.medium,
        marginTop: 20,
        fontFamily: 'Lato-Bold',
    }
});
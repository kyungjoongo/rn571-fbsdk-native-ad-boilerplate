import React from "react";
import {ThemeProvider, DefaultTheme} from 'react-native-ios-kit';
import {ImageBackground, ScrollView, Text, View} from "react-native";
import {
    createAppContainer,
    createDrawerNavigator,
    createStackNavigator,
    DrawerItems,
    NavigationScreenProp,
    NavigationState,
    SafeAreaView,
} from "react-navigation";
import WebViewScreen from "./Screens/WebViewScreen";
import MainLiveScreen from "./Screens/MainLiveScreen";
import {AppProvider} from "./Screens/app-context";
import color from 'color';

const CustomDrawerContentComponent = (props: any) => (
    <ScrollView>
        <SafeAreaView style={{}} forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', height: 70}}>
                <ImageBackground
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }}
                    source={{uri: 'https://www.navitasventures.com/wp-content/uploads/2016/06/Material-design-background-514054880_2126x1416-1024x682.jpeg'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', fontStyle: 'italic',}}>
                        홈쇼핑/핫딜모아!
                    </Text>
                </ImageBackground>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);


//LotteLiveScreen
const MainLiveScreenStack = createStackNavigator({
    MainLiveScreen: {
        screen: MainLiveScreen
    },
    //WebViewScreen
    WebViewScreen: {
        screen: WebViewScreen
    },
});



/**
 * #################################################
 * #################################################
 * _DrawerNavigator 부분
 * #################################################
 * #################################################
 */
const _DrawerNavigator = createDrawerNavigator({

    //LotteLiveScreenStack
    MainLiveScreenStack: {
        screen: MainLiveScreenStack,
        navigationOptions: {
            drawerLabel: '홈쇼핑 라이브',
        }
    },
}, {

    //####################################
    //이니셜 라우터(스크린) 설정부분
    //####################################
    initialRouteName: 'MainLiveScreenStack',
    contentOptions: {
        activeTintColor: '#2e7bff',
    },
    drawerBackgroundColor: 'white',

    drawerPosition: 'left',
    drawerWidth: 200,
    contentComponent: CustomDrawerContentComponent,
});

export interface Props {
    navigation: NavigationScreenProp<NavigationState>
}

interface State {
    isPopupOpened: boolean,
    isFirst: boolean,
}


const theme = {
    ...DefaultTheme,
    primaryColor: 'tomato',
    primaryLightColor: color('tomato').lighten(0.2).rgb().string(),
    disabledColor: 'yellow',
};

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isPopupOpened: false,
            isFirst: true,
        }
    }
    componentDidMount() {
    }

    render() {
        return (
            <AppProvider>
                <ThemeProvider theme={theme}>
                    <_DrawerNavigator/>
                </ThemeProvider>
            </AppProvider>


        )

    }
}

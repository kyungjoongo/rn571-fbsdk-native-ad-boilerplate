import React, {Component} from 'react';
import {AndroidBackHandler} from 'react-navigation-backhandler';
import {View, WebView} from 'react-native';
import {AppConsumer} from "./app-context";

export default class WebViewScreen extends Component {
    /* static navigationOptions = {
         header: ({state}) => {
             return {
                 title: state.params.title
             }
         }
     }
 */
    static navigationOptions = ({navigation}) => {

        const {state} = navigation;

        if (state.params != undefined) {

            return {
                title: state.params.title
            }
        }

    };

    constructor() {
        super();
        this.state = {
            url: 'http://display.cjmall.com/p/item/52391801?channelCode=30001003&rPIC=Tvshoppingnew',
            title: '',
        }
    }

    componentDidMount() {
        //showFacebookInitAd()
        let url = this.props.navigation.getParam('url')
        let title = this.props.navigation.getParam('title')

        this.setState({
            url: url,
            title: title,
        })

    }


    render() {
        return (
            <AppConsumer>
                {context => (
                    <AndroidBackHandler onBackPress={() => {
                        context.setVideoPause(false)
                        this.props.navigation.goBack();
                        return true;
                    }}>
                        <View style={{flex: 1}}

                              ref={() => this.context = context}
                        >
                            <WebView
                                source={{uri: this.state.url}}
                                style={{marginTop: 0}}
                            />

                        </View>
                    </AndroidBackHandler>
                )}
            </AppConsumer>


        );
    }
}
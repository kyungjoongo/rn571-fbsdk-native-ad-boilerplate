// @flow
import {Alert, BackAndroid, BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {Component} from 'react';
import axios from "axios";
import cheerio from 'react-native-cheerio'
import LotteLiveScreen from "./LotteLiveScreen";
import {AppConsumer} from "./app-context";

import {Button as Button2} from 'react-native-ios-kit'
import {showFaceBookInit} from "./Shared";
import AdComponent3 from "./AdComponent3";
import NativeAdsManager from "react-native-fbads/src/native-ads/NativeAdsManager";
const newNative001 = new NativeAdsManager('469183153606967_469186120273337', 25);

export default class MainLiveScreen extends Component<Props> {

    static navigationOptions = ({navigation}: any) => {
        return ({
            headerStyle: {
                backgroundColor: '#FFf'
            }
            , headerLeft: () => {

                return (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                        style={{width: 70, marginLeft: 0,}}
                    >
                        <Text style={{fontSize: 35, marginLeft: 10, marginBottom: 10, marginTop: 5}}>=</Text>

                    </TouchableOpacity>

                )
            }
            , title: '홈쇼핑 Live!',
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            productLists: [],
            loading: false,
            results: [],
        }
    }

    componentDidMount() {


    }


    render() {
        return (
            <AppConsumer>
                {context => (

                    <View
                        style={{flex: 1, marginTop: 0}}
                        ref={() => this.context = context}
                    >

                        <ScrollView>
                            <Text>
                                고경준 asdasd
                            </Text>
                            <View style={{height:20}}/>
                            <View style={styles.center}>

                                <Button2
                                    style={{width: '90%',}}
                                    inline rounded
                                    inverted
                                    onPress={() => {
                                        showFaceBookInit();
                                    }}
                                >
                                    facebook ad
                                </Button2>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>

                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                            <View style={{height: 320, margin:10,}}>
                                <AdComponent3 adsManager={newNative001}/>
                            </View>
                        </ScrollView>


                    </View>

                )}

            </AppConsumer>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    touchable001: {
        margin: 5,
        padding: 5,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    tabOn: {
        backgroundColor: '#185bb2',

    },
    tabOff: {
        backgroundColor: 'white',
    },
    center: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    }
});


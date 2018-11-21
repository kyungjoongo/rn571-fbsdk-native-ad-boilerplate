// @flow
import Video from 'react-native-video';
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native'
import React, {Component} from 'react';
import axios from "axios";
import cheerio from 'react-native-cheerio'
import {TextButton, RaisedTextButton} from 'react-native-material-buttons';
import {showAdmobInit} from "./Shared";
import {Button as IosButton} from 'react-native-ios-kit';
import {AppConsumer} from "./app-context";

export default class LotteLiveScreen extends Component<Props> {

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
            , title: 'Lotte Live',
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            productLists: [],
            loading: false,
            results: [],
            videoUrl: 'http://pchlslive.lotteimall.com/live/livestream/lotteimalllive_mp4.m3u8',
            topTabNo: 0,
            loading2: false,
            videoPause: this.props.videoPause,
            tab0on: true,
            tab1on: false,
            tab2on: false,
            tab3on: false,
            tab4on: false,
            tab5on: false,
            tab6on: false,
            tab7on: false,
            tab8on: false,
            curDetailUri: '',
            curTitle: '',
            isPause: false,
        }
    }

    componentDidMount() {
        this.getTitleDetailUri('lotte');
        //this.context.setVideoPause(false)
    }

    componentWillUnmount() {
        // alert('levase')
    }

    getTitleDetailUri(mallType) {
        if (mallType === 'lotte') {
            this.setState({loading2: true})

            //////////////
            let uri = 'http://www.lotteimall.com/main/viewMain.lotte?dpml_no=6&tlog=a1001_1'

            axios({
                method: 'get', url: uri,
                headers: {'Content-Type': 'text/html;charset=EUC-KR'},
                timeout: 1000 * 10,
            }).then(response => {

                let _html = response.data;
                // console.log('aaa--->', _html)

                //.rn_product_btn
                const $ = cheerio.load(_html)
                //let text = $('body > .rn_layer').html();

                let __result = $('#rn_container > .rn_tv_topview > .rn_tt_section > .rn_tt_con > .rn_tt_onair> .rn_onairbox >  .rn_onair_product > .rn_product_btn').children()
                    .attr('onclick')

                //rn_product_title
                let title = $('.rn_product_title').children().text();

                console.log('aaa', title);
                let array001 = __result.split('goods_no:')
                console.log('aaa', array001[1])
                let productNo = array001[1].split(",")[0];
                this.setState({loading2: false})
                let fullUrl = 'http://www.lotteimall.com/goods/viewGoodsDetail.lotte?goods_no=' + productNo + '&infw_disp_no_sct_cd=40&infw_disp_no=0&elog=00015_1&allViewYn=N'

                this.setState({
                    curDetailUri: fullUrl,
                    curTitle: title,
                })

            });
        }

    }



    getDateTime() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (month.toString().length == 1) {
            month = '0' + month;
        }
        if (day.toString().length == 1) {
            day = '0' + day;
        }
        if (hour.toString().length == 1) {
            hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            second = '0' + second;
        }
        var dateTime = year.toString() + month.toString() + day.toString() + hour.toString() + minute.toString();

        //var dateTime = year+month+day+hour+minute;
        return dateTime;
    }
    async goProductDetail(context) {
        this.context.incrementCount();
        this.props.navigation.push('WebViewScreen', {
            url: this.state.curDetailUri,
            title: this.state.curTitle,
            showAd: true,

        })

    }


    render() {
        return (
            <AppConsumer>
                {context => (

                    <View
                        ref={() => this.context = context}
                        style={{flex: 1, marginTop: 0}}
                    >
                        <View style={{flex: 95}}>
                            <ScrollView>
                                {/*############################
                                        Video play Part
                                ###########################*/}
                                <View style={{height: 220}}>
                                    <Video source={{uri: this.state.videoUrl}}
                                           paused={context.isVideoPause}
                                           ref={(ref) => {
                                               this.player = ref
                                           }}                                      // Store reference
                                           onBuffer={(e) => {
                                               console.log('aaa', e)
                                               if (e.isBuffering) {
                                                   this.setState({
                                                       loading: true,
                                                   })
                                               } else {
                                                   this.setState({
                                                       loading: false,
                                                   })
                                               }
                                           }}                // Callback when remote video is buffering
                                           onError={(err) => {

                                               alert(JSON.stringify(err))
                                           }}

                                           onLoadStart={e => {
                                               this.setState({
                                                   loading: false,
                                               })
                                           }}
                                           resizeMode={'contain'}

                                           onProgress={e => {
                                           }}
                                           style={styles.backgroundVideo}/>
                                </View>

                                {this.state.loading &&
                                <View style={{position: 'absolute', top: '15%', left: '50%'}}>
                                    <ActivityIndicator size={'small'} color={'red'}/>
                                </View>
                                }


                                {this.state.loading2 &&
                                <View>
                                    <ActivityIndicator color='white'/>
                                </View>
                                }
                                {/*######################################*/}
                                {/*타이틀 부분입니다                         */}
                                {/*######################################*/}
                                <View style={{alignItems: 'center', marginTop: 9, marginLeft: 15, marginRight: 15,}}>
                                    <Text style={{fontSize: 14, fontWeight: 'bold',}}>{this.state.curTitle}</Text>
                                </View>

                                {/*######################################*/}
                                {/*제품상세보기 부분입니다                         */}
                                {/*######################################*/}
                                <View style={{flexDirection: 'row', marginTop: 50, justifyContent: 'flex-start'}}>
                                    {this.state.productLists.length > 0 ?
                                        <ScrollView style={{height: 260, marginTop: -70, marginLeft: 3}}>
                                            {this.state.productLists.map(item => {

                                                return (
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={{}}>
                                                            <Image
                                                                style={{width: 50, height: 50}}
                                                                source={{uri: item.image}}
                                                                resizeMode={'contain'}
                                                            />
                                                        </View>

                                                        <TouchableOpacity
                                                            style={{alignSelf: 'center', margin: 5,}}
                                                            onPress={() => {
                                                                this.context.incrementCount();
                                                                this.props.navigation.push('WebViewScreen', {
                                                                    url: item.href,
                                                                    showAd: true,
                                                                })

                                                            }}

                                                        >
                                                            <Text>
                                                                {item.title}
                                                            </Text>
                                                        </TouchableOpacity>


                                                    </View>

                                                )

                                            })}
                                        </ScrollView>
                                        :
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: -30
                                        }}>
                                            <View style={{width: 26}}/>
                                            <IosButton inline rounded
                                                       style={{width: '95%'}}
                                                       onPress={() => {
                                                           this.context.setVideoPause(true)
                                                           this.goProductDetail('');
                                                       }}
                                            >
                                                제품 상세 보기
                                            </IosButton>
                                        </View>


                                    }
                                </View>
                                {/*#############################*/}
                                {/*하단 버튼 영영}
                                {/*#############################*/}
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 5
                                }}>

                                    <View style={{width: 25}}/>

                                    {Platform.OS === 'ios' ?
                                        <IosButton inline rounded
                                                   onPress={() => {
                                                       this.player.presentFullscreenPlayer();
                                                   }}
                                        >
                                            전체화면
                                        </IosButton> :
                                        <View style={{width: 80}}>

                                        </View>
                                    }

                                    <View style={{width: 25}}/>
                                    <IosButton inline rounded
                                               inverted
                                               onPress={() => {

                                                   //alert(this.context.isVideoPause)
                                                   this.context.setVideoPause(!context.isVideoPause)
                                               }}
                                    >
                                        재생/정지
                                    </IosButton>
                                    <View style={{width: 25}}/>
                                    <IosButton inline rounded
                                               onPress={() => {
                                                   alert('찜 되었습니다!!')
                                               }}
                                    >
                                        상품정보 찜
                                    </IosButton>
                                    <View style={{width: 10}}/>
                                </View>

                            </ScrollView>

                        </View>


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
    }
});


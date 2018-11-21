import React, {Component} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import axios from "axios";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import cheerio from "react-native-cheerio";
import {AppConsumer} from "./app-context";

export default class GmarketSuperDealScreen extends Component<Props> {

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
            , title: 'Gmarket SuperDeal',
        })
    }

    constructor() {
        super()
        this.state = {
            loading: false,
            results: [],
            resultsFullList: [],
            totalResultsFullListCount: 0,
            curPage: 1,
            bottomLoading: false,
            isLoadingMoreData: false,
        }
    }


    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.context.incrementCount();
            }
        );
        this.getCHeeiros();
    }

    getCHeeiros() {
        let url = 'http://corners.gmarket.co.kr/SuperDeals';

        this.setState({
            loading: true,
        })
        axios({
            method: 'get', url: url,
            headers: {'Content-Type': 'text/html;charset=EUC-KR'},
            timeout: 1000 * 10,
        }).then(response => {
            let _html = response.data;
            const $ = cheerio.load(_html)

            let arrayresults = [];


            let index = 0;
            $('.item_list >  li ').each(function () {
                let result = $(this).html();

                //console.log('aaa', result);
                let image = $(this).children().find('.thumb').attr('src')
                let title = $(this).find('.title').text();
                let price = $(this).find('.price').find('strong').text();
                let price2 = $(this).find('.price').find('del').text();
                let sale = $(this).find('.sale').children().text();
                let href = $(this).find('a').attr('href')

                console.log('href--->', href);

                let arrHref = href.split(',');
                let realUrl = arrHref[1];

                console.log('aaa', realUrl);

                if (realUrl != undefined) {
                    realUrl = realUrl.substring(1, realUrl.length - 1);
                }

                if (index < 50) {
                    arrayresults.push({
                        image: image,
                        title: title,
                        price: price,
                        price2: price2,
                        sale: sale.replace('할인', '%'),
                        href: realUrl,
                    })
                } else {
                    return false;
                }
                index++;
            })

            this.setState({
                results: arrayresults,
                loading: false,
                curPage: this.state.curPage + 1,
            })


            //###################
            //풀리스트 처리 부분
            //###################
            let resultsFullList = [];
            $('.item_list >  li ').each(function () {
                let image = $(this).children().find('.thumb').attr('src')
                let title = $(this).find('.title').text();
                let price = $(this).find('.price').find('strong').text();
                let price2 = $(this).find('.price').find('del').text();
                let sale = $(this).find('.sale').children().text();
                let href = $(this).find('a').attr('href')

                console.log('href--->', href);

                let arrHref = href.split(',');
                let realUrl = arrHref[1];

                console.log('aaa', realUrl);

                if (realUrl != undefined) {
                    realUrl = realUrl.substring(1, realUrl.length - 1);
                }
                resultsFullList.push({
                    image: image,
                    title: title,
                    price: price,
                    price2: price2,
                    sale: sale.replace('할인', '%'),
                    href: realUrl,
                })
            })
            this.setState({
                resultsFullList: resultsFullList,
                totalResultsFullListCount: resultsFullList.length,
            }, () => {
                console.log('aaa', 'fullList complete');
                console.log('aaa', this.state.resultsFullList.length);
                console.log('aaa', this.state.resultsFullList);
            })


        }).catch(e => alert(e));
    }

    ___renderItem = ({item, index}) => {

        var returnValue = [];

       /* if (index % 8 === 2) {
            returnValue.push(
                <AdMobBanner
                    adSize="mediumRectangle"
                    adUnitID="ca-app-pub-6826082357124500/4727726462"
                    style={{alignSelf: 'center', marginTop: 14,}}
                />
            )
        }*/

        returnValue.push(
            <View
                style={{
                    width: '100%',
                    borderWidth: 1,
                    borderBottomWidth: 1,
                    // borderLeftColor: '#008000',
                    borderLeftWidth: 10,
                    borderRightWidth: 10,
                    backgroundColor: 'white',
                    // borderColor: '#DCDCDC',
                    // borderRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderTopColor: '#DCDCDC',
                    borderBottomColor: '#DCDCDC',
                    borderLeftColor: '#f1f1f1',
                    borderRightColor: '#f1f1f1',
                    marginTop: 15,
                    margonBottom: 15,
                }}
                key={index}

            >
                <TouchableWithoutFeedback
                    style={{}}


                    onPress={() => {
                        this.context.incrementCount();
                        this.props.navigation.push('WebViewScreen', {
                            url: item.href,
                            title: item.title,
                            showAd: false,
                        })
                    }}
                >
                    <Image
                        resizeMode={'contain'}
                        style={{width: '100%', height: 250, marginTop: -23,}}
                        source={{uri: item.image}}
                    />
                </TouchableWithoutFeedback>

                <View style={{flexDirection: 'row', marginTop: -15}}>
                    <TouchableOpacity
                        style={{flex: 90}}

                        onPress={() => {
                            this.context.incrementCount();
                            this.props.navigation.push('WebViewScreen', {
                                url: item.href,
                                title: item.title,
                                showAd: false,
                            })
                        }}
                    >
                        <View style={{marginLeft: 0, flex: 90}}>
                            <View>
                                <View style={{flex: .9, marginLeft: 10, alignItems: 'center'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{
                                            fontSize: 17, fontWeight: 'bold',
                                        }}>
                                            #{index + 1}
                                        </Text>
                                        <Text style={{
                                            marginLeft: 7,
                                            fontSize: 17,
                                            fontWeight: 'bold',
                                            color: 'blue',
                                            textAlign: 'center',
                                        }}>
                                            {item.title}
                                        </Text>
                                    </View>

                                </View>
                            </View>
                            {/*   {item.sale !== '' &&
                            <Text style={{textAlign: 'center', margin: 3}}>
                                sale:{item.sale.trim()}
                            </Text>
                            }*/}

                            {item.price2 != '' &&
                            <Text style={{
                                textAlign: 'center',
                                margin: 3,
                                textDecorationLine: 'line-through',
                                fontSize: 16
                            }}>
                                원가:{item.price2}
                            </Text>
                            }


                            <Text style={{
                                textAlign: 'center',
                                margin: 3,
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>
                                할인가:{item.price}
                            </Text>


                        </View>
                    </TouchableOpacity>

                    <View style={{flex: 10, alignSelf: 'center'}}>
                        <TouchableOpacity style={{flex: .1}}
                                          onPress={() => {
                                              alert('찜 되었습니다.')
                                          }}
                        >
                            <Icon name={'heart'} size={20} color={'red'}></Icon>
                        </TouchableOpacity>

                    </View>

                </View>


            </View>
        )

        return returnValue;

    };

    async getMoreItems() {


        let __fullList = this.state.resultsFullList

        let partedList = []

        let startOffset = this.state.curPage * 50 - 50
        let endOffset = this.state.curPage * 50;

        if (this.state.totalResultsFullListCount < startOffset) {

        } else {
            this.setState({bottomLoading: true, isLoadingMoreData: true})
            console.log('aaa__startOffset', startOffset)
            console.log('aaa__endOffset', endOffset)

            let index = 0;
            __fullList.forEach(async item => {

                if (index >= startOffset && index < endOffset) {
                    partedList.push({
                        image: item.image,
                        price: item.price,
                        price2: item.price2,
                        title: item.title,
                        href: item.href,
                    })
                }
                index++;
            })

            let concatedArray = this.state.results.concat(partedList)
            this.setState({
                results: concatedArray,
                curPage: this.state.curPage + 1,
                isLoadingMoreData: false,
            })

            setTimeout(() => {
                this.setState({
                    bottomLoading: false,
                })
            }, 3000)
        }


    }


    render() {
        return (

            <AppConsumer>
                {context => (
                    <View
                        ref={() => {
                            this.context = context
                        }}
                        style={{flex: 1, marginTop: 0}}
                    >
                        {this.state.loading &&
                        <View style={{margin: 50}}>
                            <ActivityIndicator color={'red'} size={'large'}/>
                        </View>
                        }
                        {/*#######################################*/}
                        {/*클릭트 카운트 부분입니다*/}
                        {/*#######################################*/}
                        {/*<Text>
                            {context.clickedCount}
                        </Text>*/}

                        {this.state.resultsFullList != '' &&
                        <View
                            style={{
                                alignItems: 'center',
                                marginTop: 5,
                                marginBottom: 5,
                                fontWeight: 'bold',
                                fontSize: 15,
                            }}>
                            <Text>총상품갯수:{this.state.resultsFullList.length}</Text>
                        </View>
                        }

                        <FlatList
                            ref={(c) => this.flatList = c}
                            data={this.state.results}
                            renderItem={this.___renderItem}
                            initialNumToRender={45}
                            keyExtractor={(item, index) => index.toString()}
                            keyboardDismissMode="on-drag"
                            ItemSeparatorComponent={() =>
                                <View
                                    style={{
                                        height: 1,
                                        width: "100%",
                                        backgroundColor: "#CED0CE",

                                    }}
                                />
                            }

                            onEndReachedThreshold={0.3}
                            ListFooterComponent={() => {

                                if (this.state.bottomLoading) {
                                    return (
                                        <View style={{marginBottom: 50}}>
                                            <ActivityIndicator size={'large'} color={'blue'}/>
                                        </View>
                                    )
                                } else {
                                    return (
                                        <View>
                                        </View>
                                    )

                                }


                            }}
                            onEndReached={async () => {
                                //alert('sdlkflsdkfl')
                                if (!this.state.isLoadingMoreData) {
                                    await this.getMoreItems();
                                }


                            }}
                        />

                    </View>
                )}
            </AppConsumer>


        )
    }
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
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
});

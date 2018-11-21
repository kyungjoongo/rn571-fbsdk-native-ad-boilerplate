import {AdIconView, MediaView, TriggerableView, withNativeAd,} from "react-native-fbads";
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

class AdComponent3 extends React.Component {


    render() {
        const nativeAd = this.props.nativeAd;

        console.log('nativeAd-->', nativeAd)

        let text = nativeAd.bodyText;
        let completeText=''

        //alert(text.length)
        if (text.length > 150 ){
            text = text.substring(0, 150) + "..."
        }

        return (
            <View style={{
                height: 320,
                width: '100%',
                justifyContent: 'center',
                alignSelf: 'center',
                borderColor: '#b6b6b6',
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
            }}>


                <View style={{flexDirection: 'row', margin: 10, marginTop: 10}}>
                    <View>
                        <AdIconView style={{height: 50, width: 50,}}/>
                    </View>

                    <TriggerableView
                        style={{
                            width: 0,
                            hegiht: 50,
                            flexGrow: 1,
                            flex: 1,
                            alignSelf: 'center',
                            marginLeft: 10,
                        }}>

                        <Text style={{fontSize:12,}}>{text}</Text>

                    </TriggerableView>


                </View>


                {/*########################*/}
                {/*이미지 부분입니다*/}
                {/*########################*/}
                <MediaView style={{height: 210, width: '100%'}}/>

                {/*########################*/}
                {/*<!--타이블 부분입니다       */}
                {/*########################*/}
                <View style={{alignItems: 'center', marginTop: 4}}>
                    <Text style={{fontSize: 17, fontWeight: 'bold', alignSelf: 'center'}}>{nativeAd.headline}</Text>
                </View>
                <View style={{height: 10}}/>
            </View>
        );
    }
}


export default withNativeAd(AdComponent3);

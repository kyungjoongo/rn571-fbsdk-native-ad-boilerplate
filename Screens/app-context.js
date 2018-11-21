import React from 'react'
import {showAdmobInit, showFaceBookInit} from "./Shared";


export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;


export class AppProvider extends React.Component {

    constructor(props: Props) {
        super(props)

        this.state = {
            clickedCount: 1,
            deviceUniqueId: '',
            personData: {},
            isVideoPause: false,
        }

    }

    setClickedCount = (value: any) => {
        this.setState({
            clickedCount: value,
        })

    }

    incrementCount = () => {
        this.setState({
            clickedCount: this.state.clickedCount + 1,
        },()=>{
            console.log('clickedCount-->',this.state.clickedCount);
            if ( this.state.clickedCount % 4 === 0){
                //alert('%333333')
                //showAdmobInit();
                showFaceBookInit();
            }
        })
    }

    setUniqueDeiveId = (deviceUniqueId) => {
        this.setState({
            deviceUniqueId: deviceUniqueId
        })
    }
    setPersonData = (personData) => {
        this.setState({personData: personData});
    }

    watchPersonData = () => {
        firebase.database().ref("person").on("value", function (snapshot) {
            var personData = snapshot.val();
            this.setPersonData(personData);
        }.bind(this), function (error) {
        });
    }


    setVideoPause = (value) => {
        this.setState({
            isVideoPause: value,
        })
    }

    render() {

        return (
            <AppContext.Provider value={{
                clickedCount: this.state.clickedCount,
                setClickedCount: this.setClickedCount,
                incrementCount: this.incrementCount,
                deviceUniqueId: this.state.deviceUniqueId,
                setUniqueDeiveId: this.setUniqueDeiveId,
                isVideoPause: this.state.isVideoPause,
                setVideoPause: this.setVideoPause,
            }}>
                {this.props.children}
            </AppContext.Provider>


        )
    }
}


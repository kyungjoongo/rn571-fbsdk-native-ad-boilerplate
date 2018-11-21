import InterstitialAdManager from "react-native-fbads/src/InterstitialAdManager";
//AdMobInterstitial.setAdUnitID('ca-app-pub-6826082357124500/7967737513');

export const showAdmobInit = () => {
    //ca-app-pub-6826082357124500/7415264554 홈쇼핑모아
  /*  AdMobInterstitial.setAdUnitID('ca-app-pub-6826082357124500/7415264554');
    AdMobInterstitial.requestAd().then(() => {
        AdMobInterstitial.showAd()
    }).catch(e => alert(e))*/

}

export const showFaceBookInit = () => {
     InterstitialAdManager.showAd('469183153606967_469183223606960').then(didClick => {
       }).catch(error => {
           console.log(error)
       });
}

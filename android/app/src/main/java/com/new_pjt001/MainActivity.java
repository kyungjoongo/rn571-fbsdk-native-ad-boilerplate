package com.new_pjt001;

import com.facebook.react.ReactActivity;
import android.content.Intent;


public class MainActivity extends ReactActivity {


    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }


    @Override
    protected String getMainComponentName() {
        return "shopping001";
    }
}

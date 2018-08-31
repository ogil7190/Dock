package com.mycampusdock.dock;

import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class MyFirebase extends FirebaseMessagingService {
    public static final String TAG = "Dock";

    @Override
    public void onNewToken(String s) {
        super.onNewToken(s);
        Log.d(TAG, "NEW TOKEN");
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d(TAG, "From: " + remoteMessage.getFrom());
        if (remoteMessage.getData().size() > 0) {
            Log.d(TAG, "Message data payload: " + remoteMessage.getData());
        }

        // SAMPLE {type=event, content={"email":"androidrajpoot@gmail.com","name":"Vivek Rajpoot","college":"MRIIRS","_id":"ogil7190-dmvn7a","reach":[],"views":[],"enrollees":[],"timestamp":"2018-08-30T06:03:54.965Z","title":"DOCK LAUNCH","description":"Dock is going to launch somewhere between august and september","location":"AF04","category":"Sports","tags":"{\"1\":\"Cricket\",\"2\":\"Football\",\"4\":\"Volley Ball\",\"5\":\"Tennis\",\"8\":\"Outdoor\",\"9\":\"Computer Games\"}","reg_start":"2018-08-30T16:00:00.000Z","reg_end":"2018-08-31T16:00:00.000Z","date":"2018-08-31T16:00:00.000Z","contact_details":"{\"OGIL\":\"8448448040\",\"\":\"\"}","faq":"","price":"50","available_seats":"100","audience":["ogil7190","Sports"],"media":["c86b2498154221c5471ac637f630ab86img-poster.webp"]}}
        MainApplication application = (MainApplication) this.getApplication();
        try {
            // JS THREAD ACTIVE
            ReactNativeHost reactNativeHost = application.getReactNativeHost();
            ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
            ReactContext reactContext = reactInstanceManager.getCurrentReactContext();
            if (reactContext != null) {
                WritableNativeArray params = new WritableNativeArray();
                params.pushString("OGIL IS HERE");
                sendEvent(reactContext, "FCM_MSSG", params);
            }
        } catch (Exception e){
            // JS THREAD DIED

        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableNativeArray params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}

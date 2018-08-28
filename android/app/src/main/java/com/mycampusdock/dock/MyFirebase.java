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

        MainApplication application = (MainApplication) this.getApplication();

        try {
            ReactNativeHost reactNativeHost = application.getReactNativeHost();
            ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
            ReactContext reactContext = reactInstanceManager.getCurrentReactContext();

            if (reactContext != null) {
                WritableNativeArray params = new WritableNativeArray();
                params.pushString("OGIL IS HERE");
                sendEvent(reactContext, "FCM_MSSG", params);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableNativeArray params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}

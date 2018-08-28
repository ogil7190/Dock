package com.mycampusdock.dock;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
=======
import io.realm.react.RealmReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import co.apptailor.googlesignin.RNGoogleSigninPackage;

>>>>>>> mergeFIX
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import android.util.Log;
import com.google.firebase.messaging.FirebaseMessaging;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

<<<<<<< HEAD
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new SvgPackage(),
          new LinearGradientPackage(),
          new ImagePickerPackage(),
          new FBSDKPackage(mCallbackManager),
          new RNGoogleSigninPackage()
      );
    }
=======
        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RealmReactPackage(),
                    new FBSDKPackage(mCallbackManager),
                    new RNGoogleSigninPackage(),
                    new LinearGradientPackage(),
                    new SvgPackage(),
                    new ImagePickerPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };
>>>>>>> mergeFIX

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

<<<<<<< HEAD
  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    subscribe();
  }

  private void subscribe(){
    FirebaseMessaging.getInstance().subscribeToTopic("ogil");
    FirebaseMessaging.getInstance().subscribeToTopic("menime");
  }
=======
    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
>>>>>>> mergeFIX
}

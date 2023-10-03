import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
    appId: 'com.gawa.gennakar',
    appName: 'Gawa',
    webDir: 'www',
    bundledWebRuntime: false,
    plugins: {

        Keyboard: {
            resize: KeyboardResize.Body,
            style: KeyboardStyle.Dark,
            resizeOnFullScreen: true,
        },

        SplashScreen: {
            androidScaleType: "CENTER_CROP",
            splashFullScreen: true,
            splashImmersive: false,
            backgroundColor: "#ffffff",
            showSpinner: true,
            androidSpinnerStyle: "small",
            spinnerColor: "#ffffff",
        },
        
    },
};

export default config;

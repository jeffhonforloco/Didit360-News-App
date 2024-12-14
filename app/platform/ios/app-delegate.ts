import { Application, UIApplicationDelegate } from '@nativescript/core';

@NativeClass()
class AppDelegate extends UIApplicationDelegate {
    applicationDidFinishLaunchingWithOptions(
        application: UIApplication,
        launchOptions: NSDictionary<string, any>
    ): boolean {
        // Initialize iOS-specific services
        return true;
    }

    applicationDidBecomeActive(application: UIApplication): void {
        // Handle app becoming active
    }

    applicationWillResignActive(application: UIApplication): void {
        // Handle app resigning active state
    }
}

Application.ios.delegate = AppDelegate;
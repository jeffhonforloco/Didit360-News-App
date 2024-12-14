import { ios } from '@nativescript/core';

export const IOSUtils = {
    setupNavigationBar() {
        if (ios.MajorVersion >= 13) {
            const appearance = UINavigationBarAppearance.alloc().init();
            appearance.configureWithOpaqueBackground();
            UINavigationBar.appearance().standardAppearance = appearance;
            UINavigationBar.appearance().scrollEdgeAppearance = appearance;
        }
    },

    setupStatusBar() {
        const statusBar = UIApplication.sharedApplication.valueForKey('statusBarWindow');
        if (statusBar) {
            statusBar.backgroundColor = UIColor.clearColor;
        }
    },

    setupTabBar() {
        const tabBarAppearance = UITabBarAppearance.alloc().init();
        tabBarAppearance.configureWithOpaqueBackground();
        UITabBar.appearance().standardAppearance = tabBarAppearance;
        if (ios.MajorVersion >= 15) {
            UITabBar.appearance().scrollEdgeAppearance = tabBarAppearance;
        }
    }
};
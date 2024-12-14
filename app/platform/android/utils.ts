import { android, Utils } from '@nativescript/core';

export const AndroidUtils = {
    setupActionBar(activity: androidx.appcompat.app.AppCompatActivity) {
        const window = activity.getWindow();
        const decorView = window.getDecorView();
        decorView.setSystemUiVisibility(
            android.view.View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
            android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        );
    },

    setupStatusBar(activity: androidx.appcompat.app.AppCompatActivity, color: string) {
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            const window = activity.getWindow();
            window.addFlags(android.view.WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(android.graphics.Color.parseColor(color));
        }
    },

    setupBottomNavigation(bottomNav: com.google.android.material.bottomnavigation.BottomNavigationView) {
        bottomNav.setLabelVisibilityMode(
            com.google.android.material.bottomnavigation.LabelVisibilityMode.LABEL_VISIBILITY_LABELED
        );
    }
};
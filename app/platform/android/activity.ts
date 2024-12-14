import { Application, AndroidActivityCallbacks } from '@nativescript/core';

@JavaProxy('com.didit360.news.MainActivity')
class Activity extends androidx.appcompat.app.AppCompatActivity {
    public onCreate(savedInstanceState: android.os.Bundle): void {
        super.onCreate(savedInstanceState);
        Application.android.init(this.getApplication());
        // Initialize Android-specific services
    }

    public onRequestPermissionsResult(
        requestCode: number,
        permissions: Array<string>,
        grantResults: Array<number>
    ): void {
        // Handle permission results
    }
}

Application.android.on(AndroidActivityCallbacks.ActivityCreated, (activity) => {
    // Handle activity creation
});
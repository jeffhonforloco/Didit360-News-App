import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { PlatformService } from './platform.service';

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    providers: [
        PlatformService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PlatformModule { }
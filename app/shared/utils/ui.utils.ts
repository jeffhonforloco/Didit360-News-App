import { isIOS } from '@nativescript/core';

export function getStatusBarHeight(): number {
  return isIOS ? 20 : 0;
}

export function getDeviceOrientation(): 'portrait' | 'landscape' {
  // Implementation for device orientation
  return 'portrait';
}

export function showToast(message: string, duration: number = 3000): void {
  // Implementation for showing toast messages
  console.log('Toast:', message);
}
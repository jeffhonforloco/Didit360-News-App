import { Connectivity } from '@nativescript/core';

export function isConnected(): boolean {
  const connectionType = Connectivity.getConnectionType();
  return connectionType !== Connectivity.connectionType.none;
}

export function getConnectionType(): string {
  const connectionType = Connectivity.getConnectionType();
  switch (connectionType) {
    case Connectivity.connectionType.wifi:
      return 'wifi';
    case Connectivity.connectionType.mobile:
      return 'mobile';
    case Connectivity.connectionType.ethernet:
      return 'ethernet';
    default:
      return 'none';
  }
}
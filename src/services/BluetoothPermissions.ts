import { PermissionsAndroid, Platform } from 'react-native';

export async function requestBluetoothPermissions(): Promise<boolean> {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      const allGranted = Object.values(granted).every(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );

      if (!allGranted) {
        console.warn('Bluetooth permissions are required to proceed.');
        return false;
      }
      return true;
    } catch (err) {
      console.error('Permission request failed:', err);
      return false;
    }
  }
  return true; // iOS handles permissions differently
}

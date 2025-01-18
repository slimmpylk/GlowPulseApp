import BleManager from 'react-native-ble-manager';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

const bleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager);

export const startBluetooth = async () => {
    try {
        await BleManager.start({ showAlert: false });
        console.log('Bluetooth Module Initialized');

        bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (device) => {
            console.log('Discovered device:', device);
        });

        await BleManager.scan([], 5, false); // Scan for 5 seconds
        console.log('Scanning for devices...');
    } catch (error) {
        console.error('Bluetooth initialization failed:', error);
    }
};

export const stopBluetooth = async () => {
    try {
        await BleManager.stopScan();
        console.log('Scanning stopped');
    } catch (error) {
        console.error('Error stopping scan:', error);
    }
};

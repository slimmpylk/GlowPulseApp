import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// Define the server URL
const SERVER_URL = 'http://192.168.1.26:5000';

// Define the type for devices
interface Device {
  address: string;
  name: string;
  rssi: number;
}

// Define the navigation type for Home screen
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/devices`);
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching devices:', error);
      Alert.alert('Error', 'Unable to fetch devices.');
    } finally {
      setLoading(false);
    }
  };

  const connectToDevice = async (address: string) => {
    try {
      const response = await axios.post(`${SERVER_URL}/connect`, { address });
      Alert.alert('Success', response.data.status);
      navigation.navigate('HeartRateZones'); // Navigate to the HeartRateZones screen
    } catch (error) {
      console.error('Error connecting to device:', error);
      Alert.alert('Error', 'Unable to connect to the device.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth Devices</Text>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={fetchDevices}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Fetch Devices</Text>
        )}
      </TouchableOpacity>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <View style={styles.deviceItem}>
            <Text style={styles.deviceName}>{item.name || 'Unknown Device'}</Text>
            <Text style={styles.deviceDetails}>Address: {item.address}</Text>
            <Text style={styles.deviceDetails}>RSSI: {item.rssi}</Text>
            <TouchableOpacity
              style={styles.connectButton}
              onPress={() => connectToDevice(item.address)}
            >
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyList}>No devices found. Try scanning again.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e8e8e8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#7abaff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 3,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceDetails: {
    fontSize: 14,
    color: '#666',
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  connectButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Home;

import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button, Alert, FlatList } from 'react-native';
import axios from 'axios';

// Define the server URL
const SERVER_URL = 'http://192.168.1.26:5000'; // Replace with your Raspberry Pi server URL

// Define the type for a heart rate zone
interface HeartRateZone {
  zone: string;
  intensity: string;
  range: string;
}

const HeartRateZones: React.FC = () => {
  const [hrMax, setHrMax] = useState<string>(''); // User input for max HR
  const [zones, setZones] = useState<HeartRateZone[]>([]); // Store calculated zones
  const [customZones, setCustomZones] = useState<HeartRateZone[]>([
    { zone: 'Zone 1', intensity: 'Very light', range: '' },
    { zone: 'Zone 2', intensity: 'Light', range: '' },
    { zone: 'Zone 3', intensity: 'Moderate', range: '' },
    { zone: 'Zone 4', intensity: 'Hard', range: '' },
    { zone: 'Zone 5', intensity: 'Maximum', range: '' },
  ]);

  const calculateZones = () => {
    const maxHr = parseInt(hrMax, 10);
    if (isNaN(maxHr) || maxHr <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid maximum heart rate.');
      return;
    }

    const calculatedZones: HeartRateZone[] = [
      { zone: 'Zone 1', intensity: 'Very light', range: `${Math.round(maxHr * 0.5)}–${Math.round(maxHr * 0.6)} bpm` },
      { zone: 'Zone 2', intensity: 'Light', range: `${Math.round(maxHr * 0.6)}–${Math.round(maxHr * 0.7)} bpm` },
      { zone: 'Zone 3', intensity: 'Moderate', range: `${Math.round(maxHr * 0.7)}–${Math.round(maxHr * 0.8)} bpm` },
      { zone: 'Zone 4', intensity: 'Hard', range: `${Math.round(maxHr * 0.8)}–${Math.round(maxHr * 0.9)} bpm` },
      { zone: 'Zone 5', intensity: 'Maximum', range: `${Math.round(maxHr * 0.9)}–${maxHr} bpm` },
    ];
    setZones(calculatedZones);

    // Send the calculated zones to the server
    sendZonesToServer(calculatedZones);
  };

  const sendZonesToServer = async (zones: HeartRateZone[]) => {
    try {
      await axios.post(`${SERVER_URL}/zones`, {
        zones: zones.map((zone, index) => ({
          zone: index + 1,
          range: zone.range,
          intensity: zone.intensity,
        })),
      });
      Alert.alert('Success', 'Heart rate zones sent to Raspberry Pi successfully.');
    } catch (error) {
      console.error('Error sending zones to server:', error);
      Alert.alert('Error', 'Failed to send heart rate zones to Raspberry Pi.');
    }
  };

  const handleZoneChange = (index: number, range: string) => {
    const updatedZones = [...customZones];
    updatedZones[index].range = range;
    setCustomZones(updatedZones);
  };

  const submitCustomZones = async () => {
    if (customZones.some((zone) => zone.range.trim() === '')) {
      Alert.alert('Invalid Input', 'Please fill in all zone ranges.');
      return;
    }

    sendZonesToServer(customZones);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Heart Rate Zones</Text>

      {/* Calculate Zones Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Automatically Calculate Zones</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your maximum heart rate"
          keyboardType="numeric"
          value={hrMax}
          onChangeText={setHrMax}
        />
        <Button title="Calculate Zones" onPress={calculateZones} />
        {zones.length > 0 && (
          <View style={styles.zonesContainer}>
            <Text style={styles.subtitle}>Calculated Zones:</Text>
            {zones.map((zone, index) => (
              <View key={index} style={styles.zoneItem}>
                <Text style={styles.zoneText}>{zone.zone} ({zone.intensity}): {zone.range}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Custom Zones Section */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Custom Zones</Text>
        <FlatList
          data={customZones}
          keyExtractor={(item, index) => `${item.zone}-${index}`}
          renderItem={({ item, index }) => (
            <View style={styles.zoneItem}>
              <Text style={styles.zoneText}>
                {item.zone} ({item.intensity}):
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter range (e.g., 100–110 bpm)"
                value={item.range}
                onChangeText={(text) => handleZoneChange(index, text)}
              />
            </View>
          )}
        />
        <Button title="Submit Custom Zones" onPress={submitCustomZones} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  zonesContainer: {
    marginTop: 20,
  },
  zoneItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 1,
  },
  zoneText: {
    fontSize: 16,
  },
  section: {
    marginBottom: 30,
  },
});

export default HeartRateZones;

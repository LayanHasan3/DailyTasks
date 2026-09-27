import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }) {
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <View style={styles.card}>
        <Text style={styles.detail}>Status: {task.completed ? '✅ Completed' : '⏳ Pending'}</Text>
        <Text style={styles.detail}>Category: {task.category || 'General'}</Text>
        <Text style={styles.detail}>Priority: {task.priority || 'Medium'}</Text>
        <Text style={styles.detail}>ID: {task.id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', marginBottom: 16 },
  card: { padding: 16, backgroundColor: '#f8f9fa', borderRadius: 8, gap: 10 },
  detail: { fontSize: 16, color: '#4a5568' },
});
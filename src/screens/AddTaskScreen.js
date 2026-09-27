import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';
import CustomButton from '../components/CustomButton';

export default function AddTaskScreen({ navigation }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState('Medium');

  const onSave = () => {
    if (!title.trim()) return;
    dispatch(addTask({ title, category, priority }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Deploy to TestFlight"
        value={title}
        onChangeText={setTitle}
        autoFocus
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.optionRow}>
        {['Personal', 'Work', 'Study'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.badge, category === cat && styles.badgeActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={category === cat ? styles.badgeTextActive : styles.badgeText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Priority</Text>
      <View style={styles.optionRow}>
        {['Low', 'Medium', 'High'].map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.badge, priority === p && styles.badgeActive]}
            onPress={() => setPriority(p)}
          >
            <Text style={priority === p ? styles.badgeTextActive : styles.badgeText}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomButton title="Save Task" onPress={onSave} color="#2ecc71" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 15, fontWeight: '600', color: '#333', marginTop: 14, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, fontSize: 16 },
  optionRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  badge: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, backgroundColor: '#f1f5f9' },
  badgeActive: { backgroundColor: '#3498db' },
  badgeText: { color: '#475569', fontWeight: '500' },
  badgeTextActive: { color: '#fff', fontWeight: 'bold' },
});
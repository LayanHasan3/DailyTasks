import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateTask } from '../redux/taskSlice';
import CustomButton from '../components/CustomButton';

export default function EditTaskScreen({ navigation, route }) {
  const { task } = route.params;
  const dispatch = useDispatch();

  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState(task.category || 'General');
  const [priority, setPriority] = useState(task.priority || 'Medium');

  const onUpdate = () => {
    if (!title.trim()) return;
    dispatch(updateTask({ id: task.id, title, category, priority }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

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

      <CustomButton title="Update Changes" onPress={onUpdate} color="#f39c12" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 15, fontWeight: '600', color: '#333', marginTop: 14, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, fontSize: 16 },
  optionRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  badge: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, backgroundColor: '#f1f5f9' },
  badgeActive: { backgroundColor: '#f39c12' },
  badgeText: { color: '#475569', fontWeight: '500' },
  badgeTextActive: { color: '#fff', fontWeight: 'bold' },
});
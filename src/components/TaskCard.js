import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PRIORITY_COLORS = {
  High: '#e74c3c',
  Medium: '#f39c12',
  Low: '#2ecc71',
};

export default function TaskCard({ task, onToggle, onDelete, onEdit, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(task)} style={styles.taskCard}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={[styles.priorityBadge, { backgroundColor: PRIORITY_COLORS[task.priority] || '#999' }]}>
            {task.priority || 'Normal'}
          </Text>
          <Text style={styles.categoryBadge}>{task.category || 'General'}</Text>
        </View>
        <Text style={[styles.taskText, task.completed && styles.completedText]}>
          {task.title}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.iconBtn}>
          <Text style={styles.btnAction}>{task.completed ? '↩️' : '✅'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit(task)} style={styles.iconBtn}>
          <Text style={styles.btnAction}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.iconBtn}>
          <Text style={styles.btnAction}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  content: { flex: 1, marginRight: 8 },
  headerRow: { flexDirection: 'row', gap: 6, marginBottom: 6 },
  priorityBadge: { color: '#fff', fontSize: 10, fontWeight: '700', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  categoryBadge: { backgroundColor: '#f0f0f0', color: '#555', fontSize: 10, fontWeight: '600', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  taskText: { fontSize: 16, color: '#2c3e50', fontWeight: '500' },
  completedText: { textDecorationLine: 'line-through', color: '#bdc3c7' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { padding: 4, marginLeft: 6 },
  btnAction: { fontSize: 16 },
});
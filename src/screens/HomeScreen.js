import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTasks, deleteTask, toggleComplete, setSearchQuery, setFilterStatus } from '../redux/taskSlice';
import { fetchQuote } from '../services/api';
import TaskCard from '../components/TaskCard';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { items: tasks, searchQuery, filterStatus } = useSelector((state) => state.tasks);

  const [quote, setQuote] = useState(null);
  const [loadingQuote, setLoadingQuote] = useState(true);

  // Phase 4: Restore tasks from AsyncStorage on mount
  useEffect(() => {
    const loadSavedTasks = async () => {
      try {
        const raw = await AsyncStorage.getItem('@dailytasks_tasks');
        if (raw) dispatch(setTasks(JSON.parse(raw)));
      } catch (e) {
        console.error('Storage error:', e);
      }
    };
    loadSavedTasks();

    // Phase 6: Fetch quote via API
    fetchQuote()
      .then(res => setQuote(res))
      .finally(() => setLoadingQuote(false));
  }, [dispatch]);

  // Phase 3: Dynamic Search & Filtering
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterStatus === 'Active') return matchesSearch && !task.completed;
    if (filterStatus === 'Completed') return matchesSearch && task.completed;
    return matchesSearch;
  });

  return (
    <View style={styles.container}>
      {loadingQuote ? (
        <ActivityIndicator size="small" color="#3498db" />
      ) : (
        <Header title="DailyTasks 🎯" subtitle={quote ? `"${quote.quote}" — ${quote.author}` : ''} />
      )}

      {/* Search Input */}
      <TextInput
        style={styles.searchBar}
        placeholder="🔍 Search tasks..."
        value={searchQuery}
        onChangeText={(text) => dispatch(setSearchQuery(text))}
      />

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {['All', 'Active', 'Completed'].map((status) => (
          <TouchableOpacity
            key={status}
            onPress={() => dispatch(setFilterStatus(status))}
            style={[styles.filterChip, filterStatus === status && styles.filterChipActive]}
          >
            <Text style={[styles.filterChipText, filterStatus === status && styles.filterChipTextActive]}>
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomButton
        title="+ Create Task"
        onPress={() => navigation.navigate('AddTask')}
        color="#3498db"
      />

      {filteredTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Done for the day! 🎉</Text>
          <Text style={styles.emptySubtext}>No tasks matching this view.</Text>
        </View>
      ) : (
        <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={(id) => dispatch(toggleComplete(id))}
              onDelete={(id) => dispatch(deleteTask(id))}
              onEdit={(t) => navigation.navigate('EditTask', { task: t })}
              onPress={(t) => navigation.navigate('Details', { task: t })}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  searchBar: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  filterChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
  },
  filterChipActive: { backgroundColor: '#2c3e50' },
  filterChipText: { fontSize: 13, fontWeight: '600', color: '#4a5568' },
  filterChipTextActive: { color: '#ffffff' },
  taskList: { flex: 1, marginTop: 12 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 20, fontWeight: 'bold', color: '#2ecc71', marginBottom: 4 },
  emptySubtext: { fontSize: 14, color: '#7f8c8d' },
});
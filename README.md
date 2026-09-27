# DailyTasks 

A production-style task and priority management mobile application built with React Native and Expo. DailyTasks demonstrates scalable architecture using Redux Toolkit for global state, offline persistence via AsyncStorage, modular stack navigation, and external REST API integrations.

---

##  Features

- **CRUD Operations**: Create, view details, edit descriptions, toggle completion, and delete tasks.
- **Global State Architecture**: Centralized data management using Redux Toolkit (`createSlice`, pure reducers).
- **Persistent Storage**: Automatic state synchronization with device storage via `@react-native-async-storage/async-storage`.
- **Search & Filter Pipeline**: Live keyword search paired with category and status chips (All, Active, Completed).
- **REST API Integration**: Dynamic motivation quotes fetched asynchronously with error-handled fallbacks.
- **Modular Design**: Reusable atomic UI components (`TaskCard`, `CustomButton`, `Header`).

---

##  Tech Stack

- **Framework**: React Native (Expo)
- **State Management**: Redux Toolkit & React-Redux
- **Navigation**: React Navigation (Stack)
- **Local Persistence**: AsyncStorage
- **Networking**: Fetch API with async/await error boundaries

---

## 📂 Project Structure

```text
DailyTasks/
├── src/
│   ├── components/      # Reusable UI elements (CustomButton, TaskCard, Header)
│   ├── navigation/      # Stack routing definitions
│   ├── redux/           # Global store configuration and taskSlice
│   ├── screens/         # Feature screens (Home, AddTask, EditTask, Details)
│   └── services/        # External API communication layers
├── App.js               # Entry point with Provider & Navigation wrappers
└── app.json             # Expo application manifest
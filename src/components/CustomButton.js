import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({title, onPress, color ='#3498db'})
  {
    return(
      <TouchableOpacity 
       style = {[styles.button , {backgroundColor: color}]}
       onPress={onPress}
      >
        <Text style = {styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
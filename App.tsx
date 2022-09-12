import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello world!</Text>
      <Button title="Click me" />
      <StatusBar style="auto" />
    </View>
  );
}

interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity style={styles.btn}>
      <Text>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131417',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#bb8aff',
    fontSize: 22,
  },
  btn: {
    backgroundColor: '#bb8aff',
    padding: 10,
    borderRadius: 5,
    color: '#131417',
  }
});

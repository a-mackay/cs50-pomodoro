import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const seconds = 124;
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>testing out first line of native</Text>
      <TimeDisplay seconds={seconds}></TimeDisplay>
    </View>
  );
}

function TimeDisplay({seconds}) {
  var timeString = null;
  if (seconds < 60) {
    timeString = "00:" + seconds.toString().padStart(2, "0");
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds - (minutes * 60));
    const minutesString = minutes.toString().padStart(2, "0");
    const secondsString = remainingSeconds.toString().padStart(2, "0");
    timeString = `${minutesString}:${secondsString}`;
  } else {
    timeString = "??:??";
  }

  return (
    <Text style={styles.timeDisplay}>{timeString}</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeDisplay: {
    backgroundColor: '#f1f1f1',
    fontSize: 60,
  }
});

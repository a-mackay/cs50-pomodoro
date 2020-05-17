import React, {useState} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import vibrate from './utils/vibrate.js';

const LARGE_SECONDS = 5; //25 * 60;
const SMALL_SECONDS = 3;//5 * 60;
const VIBRATING_SECONDS = 5;

function getSeconds(timerType) {
  if (timerType === "VIBRATING") {
    return VIBRATING_SECONDS;
  } else if (timerType === "SMALL") {
    return SMALL_SECONDS;
  } else {
    return LARGE_SECONDS;
  }
}

function getNextTimerType(timerType) {
  if (timerType === "LARGE") {
    return "SMALL";
  } else if (timerType === "SMALL") {
    return "LARGE";
  }
}

function initialState() {
  return {
    nextTimerType: "SMALL", // SMALL or LARGE
    timerType: "LARGE", // SMALL, LARGE, or VIBRATING
    seconds: getSeconds("LARGE"),
  }
}

export default function App() {
  const [timer, setTimer] = useState(initialState());
  const [intervalId, setIntervalId] = useState(null);

  const tickTimer = (previousTimer) => {
    const secs = previousTimer.seconds;
    const currentTimerType = previousTimer.timerType;

    if (currentTimerType === "VIBRATING") {
      vibrate();
    }
    if (secs === 0) {
      if (currentTimerType === "VIBRATING") {
        return {
          nextTimerType: getNextTimerType(previousTimer.nextTimerType),
          timerType: previousTimer.nextTimerType,
          seconds: getSeconds(previousTimer.nextTimerType),
        }
      } else {
        return {
          nextTimerType: previousTimer.nextTimerType,
          timerType: "VIBRATING",
          seconds: getSeconds("VIBRATING"),
        }
      }
    } else {
      return {
        timerType: previousTimer.timerType,
        nextTimerType: previousTimer.nextTimerType,
        seconds: previousTimer.seconds - 1,
      }
    }
  }

  const startTick = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    const tempIntervalId = setInterval(() => setTimer(prevTimer => tickTimer(prevTimer)), 1000);
    setIntervalId(tempIntervalId);
  }

  const stopTick = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  const resetTimer = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setTimer(initialState())
  }

  const displaySeconds = () => {
    if (timer.timerType === "VIBRATING") {
      return 0;
    } else {
      return timer.seconds;
    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>testing out first line of native</Text>
      <TimeDisplay seconds={displaySeconds()}></TimeDisplay>
      <ResetButton onPress={resetTimer}></ResetButton>
      <StartButton onPress={startTick}></StartButton>
      <StopButton onPress={stopTick}></StopButton>
    </View>
  );
}

function ResetButton({onPress}) {
  return (
    <Button title={"Reset"} onPress={onPress}></Button>
  );
}

function StartButton({onPress}) {
  return (
    <Button
      title={"Start"}
      onPress={onPress}>
    </Button>
  )
}

function StopButton({onPress}) {
  return (
    <Button title={"Stop"} onPress={onPress}></Button>
  )
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
  );
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

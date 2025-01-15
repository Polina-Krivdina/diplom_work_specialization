import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

const Timer = () => {
  console.log("Timer is rendering");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (running && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
        setProgress((prev) => prev + 100 / (minutes * 60));
      }, 1000);
    } else if (seconds === 0 && running) {
      setRunning(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, seconds, minutes]);

  const startTimer = () => {
    const parsedMinutes = parseInt(minutes, 10);

    if (!isNaN(parsedMinutes) && parsedMinutes > 0 && parsedMinutes <= 99) {
      setSeconds(parsedMinutes * 60);
      setProgress(0);
      setRunning(true);
    } else {
      alert("Введите корректное время от 1 до 99 минут");
    }
  };

  const formatTime = (time) => {
    const mins = String(Math.floor(time / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <TextField
        label="Введите минуты (1-99)"
        variant="outlined"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        disabled={running}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={startTimer}
        disabled={running}
      >
        {running ? "Таймер запущен" : "Запустить таймер"}
      </Button>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={progress}
          size={100}
          thickness={4}
        />
        <Box
          position="absolute"
          top="20%"
          left="21%"
          transform="translate(-50%, -50%)"
        >
          <Typography variant="h5">{formatTime(seconds)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Timer;

import { useState, useEffect, useRef } from 'react';
import "./styles.css";

const Time = () => {
  //컴포넌트는 useState 훅을 사용하여 min, sec 두 개의 상태 변수 정의
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(30);
  const time = useRef(3600); // useRef hook time 변수 생성, 초 단위로 5분
  const timerId = useRef(null); // 간격 타이머의 Id 저장
  
  const [StartFlag, setStartFlag] = useState(false); // 버튼을 누를때만 작동


  // 시간이 0에 도달했을 때 확인
  // sec 상태 변수가 변경될 때마다 실행
  useEffect(() => {
    if (time.current <= 0) {
      console.log('time out');
      clearInterval(timerId.current); // 간격지우고 콘솔에 메시지 기록
      // 타임 아웃을 처리하기 위해 이벤트를 dispatch
    }
  }, [sec]);

  // stop 후 다시 시작
  const startTimer = () => {
    setStartFlag(true)
    time.current = hour*3600 + min * 60 + sec;
    timerId.current = setInterval(() => {
      setHour(parseInt(time.current / 3600));
      setMin(parseInt((time.current-hour) / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);
  };

  // setInterval()를 멈추기 위한 clearInterval() 호출
  const stopTimer = () => {
    setStartFlag(false)
    clearInterval(timerId.current);
  };

  return (
    <div className="timer">
      <p>Timer</p>
      <div>
        <p className='times'>{hour}시 {min} 분 {sec} 초</p>
      </div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
      </div>
    </div>
  );
};

export default Time;
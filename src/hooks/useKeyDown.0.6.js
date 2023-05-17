import { useState, useEffect } from "react";

/*  2023-05-17 09:49:57
keyUp 이 아닌 keyDown 을 쓰는 이유는,
키보드를 빠르게 연타할 때, keyUp 이 keyDown 보다 정확해진다.
그리고 길게 눌렀을 때, 이에 대한 반응도 가능해진다.

Usage:
const handleKeyDown = (e) => {
  if (
    (typeof Number(e.key) === "number" && !isNaN(Number(e.key))) ||
    e.key === "Enter"
  ) {
    numClick(e);
  } else if (operators.includes(e.key) || e.key === "Escape") {
    operatorClick(e);
  } else {
    return;
  }
};
useKeyDown(handleKeyDown);
*/

/*
  매개변수로 전달받은 callback(handleKeyDown) 펑션을 useEffect 훅으로 익스큐트 시켜준다.
*/
const useKeyDown = (callback) => {
  useEffect(() => {
    const keyDownBinder = (event) => {
      callback(event);
    };
    //  키보드 이벤트 리스너를 생성해주고, 거기에 handleKeyDown 펑션을 바인딩해준다.
    document.addEventListener("keydown", keyDownBinder);
    //  클린업 펑션이다. 클린업 해주지 않으면 이벤트리스너가 누적된다.
    return () => {
      document.removeEventListener("keydown", keyDownBinder);
    };
  }, [callback]);
};

export { useKeyDown };

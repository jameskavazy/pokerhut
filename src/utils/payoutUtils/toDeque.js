import Deque from "./Deque";

export function toDeque(playersArr){
    const playersDeque = new Deque();
    playersArr.forEach((e) => playersDeque.addRear(e));
    return playersDeque;
}
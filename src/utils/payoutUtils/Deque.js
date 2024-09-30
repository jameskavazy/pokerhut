class Deque {

    constructor () {
        this.deque = [];
    }

    addFront(element){
        this.deque.unshift(element);
    }

    addRear(element){
        this.deque.push(element);
    }

    isEmpty(){
        return this.deque.length === 0;
    }

    removeFront(){
        if (!this.isEmpty()){
            return this.deque.shift();
        }
        return null;
    }

    removeRear(){
        if (!this.isEmpty()){
            return this.deque.pop();
        }
        return null;
    }

    getFront(){
        if (!this.isEmpty()) {
            return this.deque[0];
        }
        return null;
    } 

    getRear(){
        if (!this.isEmpty()){
            return this.deque[this.size() - 1];
        }
        return null;
    }

    size() {
        return this.deque.length;
    }

}

export default Deque;
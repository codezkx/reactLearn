function increment(n) {
  return n + 1;
}

increment.toString = () => 'n => n + 1';

export const stateQueueList = [
  {
    id: 0,
    baseState: 0,
    queue: [1, 1, 1],
    expected: 1,
  },
  {
    id: 1,
    baseState: 0,
    queue: [increment, increment, increment],
    expected: 3,
  },
  {
    id: 2,
    baseState: 0,
    queue: [5, increment],
    expected: 6,
  },
  {
    id: 3,
    baseState: 0,
    queue: [5, increment, 42],
    expected: 42,
  },
]
export const Pieces: Record<string, number[][][]> = {
  I: [
    [
      // 270°
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    [
      // 0°
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      // 90°
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    [
      // 180°
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],
  ],
  O: [
    [
      // Only one rotation
      [1, 1],
      [1, 1],
    ],
  ],
  T: [
    [
      // 0°
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      // 90°
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      // 180°
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      // 270°
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  S: [
    [
      // 0°
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    [
      // 90°
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    [
      // 180°
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      // 270°
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  Z: [
    [
      // 0°
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    [
      // 90°
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      // 180°
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      // 270°
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
  ],
  J: [
    [
      // 0°
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      // 90°
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      // 180°
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
    [
      // 270°
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
  ],
  L: [
    [
      // 0°
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      // 90°
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    [
      // 180°
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      // 270°
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
  ],
};

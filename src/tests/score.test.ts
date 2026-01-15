import Score from "../score";
import Frame from "../frame";

const createFrameWithRolls = (frameNumber: number, rolls: number[]): Frame => {
  const frame = new Frame(frameNumber);
  rolls.forEach((roll) => frame.addRoll(roll));
  return frame;
};

describe("Score.computeScore", () => {
  test("returns an empty array when no frames are provided", () => {
    const score = new Score();

    const result = score.computeScore([]);

    expect(result).toEqual([]);
  });

  test("returns null for an incomplete frame", () => {
    const score = new Score();

    const frame = createFrameWithRolls(1, [6]);

    const result = score.computeScore([frame]);

    expect(result).toEqual([
      { frameNumber: 1, frameScore: null },
    ]);
  });

  test("scores an open frame as the sum of its rolls", () => {
    const score = new Score();

    const frame = createFrameWithRolls(1, [6, 3]);

    const result = score.computeScore([frame]);

    expect(result).toEqual([
      { frameNumber: 1, frameScore: 9 },
    ]);
  });

  test("scores a spare as 10 plus the next roll", () => {
    const score = new Score();

    const frame1 = createFrameWithRolls(1, [5, 5]); // spare
    const frame2 = createFrameWithRolls(2, [8, 1]);

    const result = score.computeScore([frame1, frame2]);

    expect(result).toEqual([
      { frameNumber: 1, frameScore: 18 },
      { frameNumber: 2, frameScore: 9 },
    ]);
  });

  test("returns null for a spare if the next roll is not available", () => {
    const score = new Score();

    const frame = createFrameWithRolls(1, [5, 5]);

    const result = score.computeScore([frame]);

    expect(result).toEqual([
      { frameNumber: 1, frameScore: null },
    ]);
  });

  test("scores a strike as 10 plus the next two rolls", () => {
    const score = new Score();

    const frame1 = createFrameWithRolls(1, [10]); // strike
    const frame2 = createFrameWithRolls(2, [8, 1]);

    const result = score.computeScore([frame1, frame2]);

    expect(result).toEqual([
      { frameNumber: 1, frameScore: 19 },
      { frameNumber: 2, frameScore: 9 },
    ]);
  });

  test("scores consecutive strikes correctly", () => {
    const score = new Score();

    const frame1 = createFrameWithRolls(1, [10]);
    const frame2 = createFrameWithRolls(2, [10]);
    const frame3 = createFrameWithRolls(3, [5, 5]);

    const result = score.computeScore([frame1, frame2, frame3]);

    expect(result).toEqual([
      { frameNumber: 1, frameScore: 30 },
      { frameNumber: 2, frameScore: 20 },
      { frameNumber: 3, frameScore: 10 },
    ]);
  });

  test("returns null for a strike if bonus rolls are missing", () => {
    const score = new Score();

    const frame = createFrameWithRolls(1, [10]);

    const result = score.computeScore([frame]);

    expect(result).toEqual([
      { frameNumber: 1, frameScore: null },
    ]);
  });

  test("scores the 10th frame as an open frame with no bonus", () => {
    const score = new Score();

    const frames: Frame[] = [
      ...Array.from({ length: 9 }, (_, i) =>
        createFrameWithRolls(i + 1, [0, 0])
      ),
      createFrameWithRolls(10, [3, 6]),
    ];

    const result = score.computeScore(frames);

    expect(result[9]).toEqual({
      frameNumber: 10,
      frameScore: 9,
    });
  });

  test("scores the 10th frame spare using its bonus roll", () => {
    const score = new Score();

    const frames: Frame[] = [
      ...Array.from({ length: 9 }, (_, i) =>
        createFrameWithRolls(i + 1, [0, 0])
      ),
      createFrameWithRolls(10, [5, 5, 7]),
    ];

    const result = score.computeScore(frames);

    expect(result[9]).toEqual({
      frameNumber: 10,
      frameScore: 17,
    });
  });

  test("scores the 10th frame strike using two bonus rolls", () => {
    const score = new Score();

    const frames: Frame[] = [
      ...Array.from({ length: 9 }, (_, i) =>
        createFrameWithRolls(i + 1, [0, 0])
      ),
      createFrameWithRolls(10, [10, 10, 10]),
    ];

    const result = score.computeScore(frames);

    expect(result[9]).toEqual({
      frameNumber: 10,
      frameScore: 30,
    });
  });

  test("returns null for the 10th frame spare if bonus roll is missing", () => {
    const score = new Score();

    const frames: Frame[] = [
      ...Array.from({ length: 9 }, (_, i) =>
        createFrameWithRolls(i + 1, [0, 0])
      ),
      createFrameWithRolls(10, [5, 5]),
    ];

    const result = score.computeScore(frames);

    expect(result[9]).toEqual({
      frameNumber: 10,
      frameScore: null,
    });
  });

  test("returns null for the 10th frame strike if both bonus rolls are not present", () => {
    const score = new Score();

    const frames: Frame[] = [
      ...Array.from({ length: 9 }, (_, i) =>
        createFrameWithRolls(i + 1, [0, 0])
      ),
      createFrameWithRolls(10, [10, 7]),
    ];

    const result = score.computeScore(frames);

    expect(result[9]).toEqual({
      frameNumber: 10,
      frameScore: null,
    });
  });

  test("does not calculate scores beyond the 10th frame", () => {
    const score = new Score();

    const frames: Frame[] = [
      ...Array.from({ length: 9 }, (_, i) =>
        createFrameWithRolls(i + 1, [0, 0])
      ),
      createFrameWithRolls(10, [10, 10, 10]),
      createFrameWithRolls(11, [10, 10]),
    ];

    const result = score.computeScore(frames);

    expect(result).toHaveLength(10);
    expect(result[9]!.frameScore).toBe(30);
  });
});

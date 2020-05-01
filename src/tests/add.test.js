const add = (a, b) => a+b;

test('add two numbers', () => {
    const result = add(3, 4);
    expect(result).toBe(7);
});
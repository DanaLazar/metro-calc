export function calculateExpression(
  prev: string,
  op: string,
  current: string,
): string {
  const prevNum = parseFloat(prev);
  const currNum = parseFloat(current);
  let result = 0;

  switch (op) {
    case "+":
      result = prevNum + currNum;
      break;
    case "-":
      result = prevNum - currNum;
      break;
    case "×":
      result = prevNum * currNum;
      break;
    case "÷":
      result = currNum !== 0 ? prevNum / currNum : 0;
      break;
    default:
      result = currNum;
  }

  return result.toString();
}

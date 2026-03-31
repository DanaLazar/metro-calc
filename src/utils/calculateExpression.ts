export function calculateExpression(
  prev: string,
  op: string,
  current: string,
): string {
  const prevNum = parseFloat(prev);
  const currNum = parseFloat(current);
  let result: number | string = 0;

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
      result = currNum !== 0 ? prevNum / currNum : "not possible";
      break;
    default:
      result = currNum;
  }

  return result.toString();
}

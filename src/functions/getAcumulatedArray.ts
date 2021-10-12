export default function calculateAcumulateArray(
  regularArray: number[]
){
  let acumulate: number[] = [];
  let currentValue: number = 0;

  regularArray.forEach(value => {
    currentValue = currentValue + value;
    acumulate.push(currentValue)
  });

  return acumulate;
}
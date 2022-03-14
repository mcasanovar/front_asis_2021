export default function calculateAcumulateArray(regularArray: number[]) {
    const acumulate: number[] = []
    let currentValue = 0

    regularArray.forEach(value => {
        currentValue = currentValue + value
        acumulate.push(currentValue)
    })

    return acumulate
}

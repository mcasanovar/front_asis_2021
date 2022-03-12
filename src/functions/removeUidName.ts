export default function removeUidName(text: string) {
    const aux = text.split('_')
    let result: string = ''
    aux.forEach((current: string, index: number) => {
        console.log('armando', result)
        if (index === 0) {
            result = result.concat(current)
        }
        if (index !== 0 && index < aux.length - 1) {
            result = `${result}_${current}`
        }
    })

    return result
}

export default function removeUidName(text: string) {
    const aux = text.split('_')
    let result = ''
    aux.forEach((current: string, index: number) => {
        if (index === 0) {
            result = result.concat(current)
        }
        if (index !== 0 && index < aux.length - 1) {
            result = `${result}_${current}`
        }
    })

    return result
}

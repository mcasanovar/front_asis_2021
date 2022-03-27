export default function transformToCamelCase(str: any) {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m: any, chr: any) => chr.toUpperCase())
}

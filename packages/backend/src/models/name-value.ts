export interface NameValue {
    name: string
    value: any
}

export const mapToNameValue = (map: Map<string, any>): NameValue[] => {
    return Array.from(map.entries()).map(([name, value]) => ({
        name: name,
        value: value
    }))
}
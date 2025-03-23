type ConstantDefinition = Record<string, string | number>
type ConstantData = Record<string | number, { displayName: string }>

export function createConstant<T extends ConstantDefinition>(
  definition: T,
  data: ConstantData
) {
  return {
    ...definition,
    data,
    getDisplayName(value: number | string): string | number | '' {
      return this.data[value]?.displayName || ''
    },
    getDropdownList(): { label: string; value: number | string }[] {
      return Object.entries(this.data).map(([key, value]) => ({
        label: value.displayName,
        value: typeof key === 'number' ? Number(key) : key,
      }))
    },
  }
}

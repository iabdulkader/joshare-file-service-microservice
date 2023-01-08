export function sizeModifier(bits: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bits) / Math.log(1024));
    return (bits / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}
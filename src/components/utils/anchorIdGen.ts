function generateAnchorId(text: string, frameCoords: number[]): string {
    return text.slice(-6) + frameCoords.map(coord => String(coord).slice(-6)).join('') + Date.now().toString().slice(-6)
}

export default generateAnchorId;
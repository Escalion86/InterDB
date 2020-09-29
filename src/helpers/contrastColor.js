const contrastColor = (color, newVersion = true) => {
	function hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
			  }
			: null
	}
	const RGBColor = hexToRgb(color)
	const lightColor =
		(newVersion
			? (0.2126 * RGBColor.r + 0.7152 * RGBColor.g + 0.0722 * RGBColor.b) / 255
			: (0.299 * RGBColor.r + 0.587 * RGBColor.g + 0.114 * RGBColor.b) / 255) >
		0.5

	return lightColor ? "#000000" : "#ffffff"
}

export default contrastColor

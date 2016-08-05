export default class Color {
	constructor(red: number, green: number, blue: number) {
		this.red = red || 0;
		this.green = green || 0;
		this.blue = blue || 0;
	}

	private toStr(num: number): string {
		var prefix = num < 16 ? '0' : '';
		return prefix + num.toString(16);
	}

	public toHexString(): string {
		return '#' + this.toStr(this.red) + this.toStr(this.green) + this.toStr(this.blue);    
	}

	red: number;
	green: number;
	blue: number;
}

import Color from './color';

export default class ColorGenerator {
	
	private createRandomColor(): Color {
		return new Color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
	}

	public generateColor(): string {
		return this.createRandomColor().toHexString();
	}
}


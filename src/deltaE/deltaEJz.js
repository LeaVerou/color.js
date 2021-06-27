import Color from "../spaces/jzazbz.js";
import "../spaces/jzczhz.js";

// More accurate color-difference formulae
// than the simple 1976 Euclidean distance in Lab

// Uses JzCzHz, which has improved perceptual uniformity
// and thus a simple Euclidean root-sum of ΔL² ΔC² ΔH²
// gives good results.

Color.prototype.deltaEJz = function (sample) {
	let color = this;
	sample = Color.get(sample);

	// Given this color as the reference
	// and a sample,
	// calculate deltaE in JzCzHz.

	let [Jz1, Cz1, Hz1] = color.jzczhz;
	let [Jz2, Cz2, Hz2] = sample.jzczhz;

	// Lightness and Chroma differences
	// sign does not matter as they are squared.
	let ΔJ = Jz1 - Jz2;
	let ΔC = Cz1 - Cz2;

	// length of chord for ΔH
	if ((Number.isNaN(Hz1)) && (Number.isNaN(Hz2))) {
		// both undefined hues
		Hz1 = 0;
		Hz2 = 0;
	}
	else if (Number.isNaN(Hz1)) {
		// one undefined, set to the defined hue
		Hz1 = Hz2;
	}
	else if (Number.isNaN(Hz2)) {
		Hz2 = Hz1;
	}

	let Δh = Hz1 - Hz2;
	let ΔH = 2 * Math.sqrt(Cz1 * Cz2) * Math.sin(Δh * Math.PI / 180);

	return Math.sqrt(ΔJ ** 2 + ΔC ** 2 + ΔH ** 2);
};

Color.statify(["deltaEJz"]);

(function () {
	let inputDownloadRate = document.getElementById("download-rate"),
		inputDownloadSize = document.getElementById("download-size"),
		selectRateUnits = document.getElementById("rate-units"),
		selectSizeUnits = document.getElementById("size-units"),
		spanResult = document.getElementById("result");

	document.getElementById("calculate").addEventListener("click", function (e) {
		const seconds = calculateDownloadTime(inputDownloadSize.value,
			selectSizeUnits.value,
			inputDownloadRate.value,
			selectRateUnits.value);

		const time = secondsToHuman(seconds);

		spanResult.innerText = time;
	});

	// Calcula los segudos que tarda en descargar la información
	function calculateDownloadTime(dataSize, dataUnit, rateSize, rateUnit) {
		let rate;
		switch (rateUnit) {
			case "kbps": rate = rateSize * 1000; break;
			case "mbps": rate = rateSize * 1000 * 1000; break;
			case "gbps": rate = rateSize * 1000 * 1000 * 1000; break;
			default    : rate = rateSize * 1;
		}

		const bits = convertToBits(dataSize, dataUnit);

		return Math.floor(bits / rate);
	}

	// Convierte un dato a su equivalente en bits
	function convertToBits(size, unit) {
		switch (unit) {
			case "kib": return size * 8 * 1024;
			case "mib": return size * 8 * 1024 * 1024;
			case "gib": return size * 8 * 1024 * 1024 * 1024;

			case "kb" : return size * 8 * 1000;
			case "mb" : return size * 8 * 1000 * 1000;
			case "gb" : return size * 8 * 1000 * 1000 * 1000;

			default   : return size * 8 * 1;
		}
	}

	// Convierte los segundos a formato 00:00:00
	function secondsToHuman(seconds) {
		if (isNaN(seconds) || seconds < 0) {
			return null;
		}

		let hours = twoDigitNumber(Math.floor(seconds / 3600));
		let minutes = twoDigitNumber(Math.floor(seconds / 60 % 60));
		seconds = twoDigitNumber(seconds % 60);

		return `${hours}:${minutes}:${seconds}`;
	}

	// Devuelve en formato de texto un número de dos dígitos
	function twoDigitNumber(number) {
		if (isNaN(number) || number < 1) {
			return "00";
		}

		if (number < 10) {
			return `0${number}`;
		} else {
			return `${number}`;
		}
	}
})();

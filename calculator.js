(function () {
	let inputDownloadRate = document.getElementById("download-rate"),
		inputDownloadSize = document.getElementById("download-size"),
		selectRateUnits = document.getElementById("rate-units"),
		selectSizeUnits = document.getElementById("size-units"),
		divResult = document.getElementById("result");

	document.getElementById("calculate").addEventListener("click", function(e) {
		let downloadRate = simplifyDownloadRate(inputDownloadRate.value, selectRateUnits.value),
			downloadSize = simplifyDownloadSize(inputDownloadSize.value, selectSizeUnits.value) * 8;

		let result = secondsToHuman(Math.floor(downloadSize / downloadRate));

		divResult.innerHTML = result;
	});

	// Recursividad. Convierte cualquier tasa de descarga a Mbit/s
	function simplifyDownloadRate(size, rate, mode = 0) {
		switch (rate) {
			case  "bps": mode = -2; break;
			case "kbps": mode = -1; break;
			case "mbps": mode =  0; break;
			case "gbps": mode =  1; break;
		}

		if (mode > 0)
			size = simplifyDownloadRate(size * 10, "", mode - 1);

		else if (mode < 0)
			size = simplifyDownloadRate(size / 10, "", mode + 1)

		return size;
	}

	// Recursividad. Convierte cualquier tamaño de archivo a MiB
	function simplifyDownloadSize(size, unit, mode = 0) {
		switch (unit) {
			case "kib": return simplifyDownloadSize(size / 8, "kb"); break;
			case "mib": return simplifyDownloadSize(size / 8, "mb"); break;
			case "gib": return simplifyDownloadSize(size / 8, "gb"); break;

			case "b":	mode = -2; break;
			case "kb":	mode = -1; break;
			case "mb":	mode =  0; break;
			case "gb":	mode =  1; break;
		}

		if (mode > 0)
			size = simplifyDownloadSize(size * 1024, "", mode - 1);

		else if (mode < 0)
			size = simplifyDownloadSize(size / 1024, "", mode + 1)

		return size;
	}

	// Convierte los segundos a formato 00:00:00
	function secondsToHuman(seconds) {
		if (isNaN(seconds) || seconds < 0) return null;

		let hours = twoDigitNumber(Math.floor(seconds / 3600));
		let minutes = twoDigitNumber(Math.floor(seconds / 60 % 60));
		seconds = twoDigitNumber(seconds % 60);

		return hours + ":" + minutes + ":" + seconds;
	}

	// Devuelve en formato de texto un número de dos dígitos
	function twoDigitNumber(number) {
		if (isNaN(number) || number < 1 || number > 99) return "00";

		if (number < 10)
			return "0" + number.toString();

		else
			return number.toString();
	}
})();

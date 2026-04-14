let chartCorrente = null;

function generaRademacher() {
    return Math.random() < 0.5 ? -1 : 1;
}

function costruisciProcessoScalato(T, n) {
    const punti = [];
    let somma = 0;

    punti.push({ x: 0, y: 0 });

    for (let k = 1; k <= n; k++) {
        const t = k * T / n;
        somma += generaRademacher();
        const valore = somma / Math.sqrt(n);

        punti.push({ x: t, y: valore });
    }

    return punti;
}

function generaGrafico() {
    const T = 1;
    const nValues = [50, 200, 1000];

    const datasets = nValues.map((n) => {
        return {
            label: "n = " + n,
            data: costruisciProcessoScalato(T, n),
            fill: false,
            tension: 0,
            borderWidth: 2,
            pointRadius: 0,
            parsing: false
        };
    });

    const ctx = document.getElementById("grafico").getContext("2d");

    if (chartCorrente !== null) {
        chartCorrente.destroy();
    }

    chartCorrente = new Chart(ctx, {
        type: "line",
        data: {
            datasets: datasets
        },
        options: {
            responsive: false,
            parsing: false,
            plugins: {
                title: {
                    display: true,
                    text: "Random Walk scalata verso il Moto Browniano"
                },
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    type: "linear",
                    min: 0,
                    max: 1,
                    title: {
                        display: true,
                        text: "Tempo t"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "W_n(t)"
                    }
                }
            }
        }
    });
}

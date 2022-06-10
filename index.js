//BTCBUSD
//29073
//28702

/*
RSI > 70 comprado
RSI < 30 vendido
Fora de intervalo é grafico lateralizado
*/

const credentials = {
    //DevKeyMMS
    apiKey: "p3s8G1bOwZHOSMVDjCEhxgGrMedVkAgWGyswcY9ElbF18mZH8fdqXgb0iBZ3pTTc",
    apiSecret: "fNNXGMnt8zckLPhNUYwCvGSqp3LeTqmVdzY8IRpT7JIAwnjeDvuoGwtRr5SdDwvi",
    test: true
}

function calcRSI(closes) {
    let gains = 0;
    let losses = 0;

    for (let i = closes.length - 14; i < closes.length; i++) {
        const diff = closes[i] - closes[i - 1];

        if (diff >= 0)
            gains += diff;
        else
            losses -= diff;
    }

    const strength = gains / losses;

    return 100 - (100 / (1 + strength));
}

let bougth = false;

async function process() {
    const axios = require('axios');
    const response = await axios.get('https://api.binance.com/api/v3/klines?symbol=BTCBUSD&interval=1m');

    const closes = response.data.map(candle => parseFloat(candle[4]));
    const rsi = calcRSI(closes);
    console.log(rsi);

    if (rsi > 70) {
        console.log('Sobrecomprado!');
        //vender();
        bougth = false;
    } else if (rsi <= 30 && !bougth) {
        console.log('Sobrevendido!');
        //comprar();
        bougth = true;
    } else
        console.log('lateralizado...');

    /*
    const candle = response.data[499];
    const TempAbertura = candle[0];
    const VlrAbertura = candle[1];
    const Maxima = candle[2];
    const Minima = candle[3];
    const VlrAtual = ;

    console.log(VlrAtual);
    if (VlrAtual >= 29073 || (VlrAtual <= 29073 && VlrAtual >= 28702))
        console.log('Vender!');
    else if (VlrAtual <= 28702)
        console.log('Comprar!');
    else
        console.log('Aguardar...');
        */
}

setInterval(process, 60000);

process();


document.addEventListener('DOMContentLoaded', function () {

    const input = document.querySelector('#frase');
    const botao = document.querySelector('#btn-cripto');
    const entrecontato = document.querySelector('#entrecontato');
    const mensagem = document.getElementById('mensagem');

    botao.addEventListener('click', function () {
        criptografia(input);
    });

    entrecontato.addEventListener('click', function () {
        let arr = [
            `https://www.linkedin.com/in/bruno-p-duraes/`,
            `https://www.linkedin.com/in/samuel-mendes-699979190/`
        ];
        for(const[i, links] of arr.entries()){
            window.open(links);
        } 
    });

});

function criptografia(input) {
    let string = input.value;

    if (string.trim() === '') {

        mensagem.textContent = "Digite uma frase ou uma palavra.";
        console.log("entrou no trim ")

    } else {

        const padrao = /\d+/;
        if (padrao.test(string)) {
            mensagem.textContent = "O texto contém números.";
            console.log("COMTEM NUMEROS")

        } else {

            const codMapper = {
                'a': 1,
                'b': 2,
                'c': 3,
                'd': 4,
                'e': 5,
                'f': 6,
                'g': 7,
                'h': 8,
                'i': 9,
                'j': 10,
                'k': 11,
                'l': 12,
                'm': 13,
                'n': 14,
                'o': 15,
                'p': 16,
                'q': 17,
                'r': 18,
                's': 19,
                't': 20,
                'u': 21,
                'v': 22,
                'w': 23,
                'x': 24,
                'y': 25,
                'z': 26,
                '.': 27,
                ',': 28,
                '!': 29,
                '?': 30,
                ' ': 31
            };

            const decodeMapper = {
                1: 'a',
                2: 'b',
                3: 'c',
                4: 'd',
                5: 'e',
                6: 'f',
                7: 'g',
                8: 'h',
                9: 'i',
                10: 'j',
                11: 'k',
                12: 'l',
                13: 'm',
                14: 'n',
                15: 'o',
                16: 'p',
                17: 'q',
                18: 'r',
                19: 's',
                20: 't',
                21: 'u',
                22: 'v',
                23: 'w',
                24: 'x',
                25: 'y',
                26: 'z',
                27: '.',
                28: ',',
                29: '!',
                30: '?',
                31: ' '
            };

            const COD = [[4, 1], [3, 1]];
            const DECOD = [[1, -1], [-3, 4]];

            // Verifica a quantidade de caracteres, se impar corrige adicionando um espaço
            if (string.length % 2 == 1) {
                string += ' ';
            }
            let seqNumeros = string.split('').map((caracter) => codMapper[caracter.toLocaleLowerCase()]);
            let matrizTexto = [];

            // Extrai os números da sequencia de 4 em 4 formando as matrizes à serem codificadas
            while (seqNumeros.length > 0) {
                let array = seqNumeros.splice(0, 4);
                if (array.length == 4) {
                    matrizTexto.push([
                        [array[0], array[1]],
                        [array[2], array[3]]
                    ]);
                } else if (array.length == 2) {
                    matrizTexto.push([
                        [array[0], array[1]]
                    ]);
                }
            };

            // Codificando as matrizes do texto
            let matrizCodificada = [];
            for (const [i, m] of matrizTexto.entries()) {

                const matriz = m.length == 2 ? { a: m[0][0], b: m[0][1], c: m[1][0], d: m[1][1] } : { a: m[0][0], b: m[0][1] };
                const cod = { a: COD[0][0], b: COD[0][1], c: COD[1][0], d: COD[1][1] };

                let matrizCod = [];
                let COD_AB = [matriz.a * cod.a + matriz.b * cod.c, matriz.a * cod.b + matriz.b * cod.d];
                let COD_CD = [matriz.c * cod.a + matriz.d * cod.b, matriz.c * cod.c + matriz.d * cod.d];
                if (m.length == 2) {
                    matrizCod.push(COD_AB);
                    matrizCod.push(COD_CD);
                } else {
                    matrizCod.push(COD_AB);
                }
                matrizCodificada.push(matrizCod);
            }

            // Decodificando as matrizes
            let matrizDecodificada = [];
            for (const [i, m] of matrizCodificada.entries()) {

                const matriz = m.length == 2 ? { a: m[0][0], b: m[0][1], c: m[1][0], d: m[1][1] } : { a: m[0][0], b: m[0][1] };
                const decod = { a: DECOD[0][0], b: DECOD[0][1], c: DECOD[1][0], d: DECOD[1][1] };

                let matrizDec = [];
                let DECOD_AB = [matriz.a * decod.a + matriz.b * decod.c, matriz.a * decod.b + matriz.b * decod.d];
                let DECOD_CD = [matriz.c * decod.a + matriz.d * decod.b, matriz.c * decod.c + matriz.d * decod.d];
                if (m.length == 2) {
                    matrizDec.push(DECOD_AB);
                    matrizDec.push(DECOD_CD);
                } else {
                    matrizDec.push(DECOD_AB);
                }
                matrizDecodificada.push(matrizDec);
            }

            let stringDecodificada = '';
            for (const [i, n] of matrizDecodificada.entries()) {
                if (n.length == 2) {
                    stringDecodificada += `${decodeMapper[n[0][0]]}${decodeMapper[n[0][1]]}${decodeMapper[n[1][0]]}${decodeMapper[n[1][1]]}`;
                } else {
                    stringDecodificada += `${decodeMapper[n[0][0]]}${decodeMapper[n[0][1]]}`;
                }
            };

            console.log(seqNumeros, matrizCodificada, matrizDecodificada, string, stringDecodificada);

            // sequencia de numeros

            mensagem.textContent = '';

            document.getElementById('sequencia').innerHTML = `Sequencia gerada <br>${matrizTexto}`;
           
            // matriz codificada
            document.getElementById('codifiada').innerHTML = `Texto codificado <br> ${matrizCodificada}`;

            // matriz decodificada
            document.getElementById('decodificada').innerHTML = `Texto decodificado <br>${matrizDecodificada}`;            

            // resultado
            document.getElementById('frasedecod').innerHTML = `Retorno <br>${stringDecodificada}`;  

        }
    }
}

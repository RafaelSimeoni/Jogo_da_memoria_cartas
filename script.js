const cartas = document.querySelectorAll('.carta')
let primeiraCarta, segundaCarta
let haCartaVirada = false
let travarTabuleiro = false

function virarCarta() {
    if(travarTabuleiro) return
    if(this === primeiraCarta) return
    this.classList.add('carta-virada')
    if (!haCartaVirada) {
        haCartaVirada = true
        primeiraCarta = this
        return
    }
    segundaCarta = this
    haCartaVirada = false
    verificarCartasIguais()
}

function verificarCartasIguais(){
    if(primeiraCarta.dataset.card === segundaCarta.dataset.card) {
        desabilitarCarta()
    } else {
        desvirarCartas()
    }
}

function desabilitarCarta() {
    primeiraCarta.removeEventListener('click', virarCarta)
    segundaCarta.removeEventListener('click', virarCarta)

    resetarTabuleiro()
}

function desvirarCartas() {
    travarTabuleiro = true
    setTimeout(() => {
        primeiraCarta.classList.remove('carta-virada')
        segundaCarta.classList.remove('carta-virada')

        resetarTabuleiro()
    }, 1500)
}

function resetarTabuleiro() {
    [haCartaVirada, travarTabuleiro] = [false, false]
    [primeiraCarta, segundaCarta] = [null, null]
}

(function embaralharCartas() {
    cartas.forEach((carta) => {
        let posicaoAleatoria = Math.floor(Math.random() * 12)
        carta.style.order = posicaoAleatoria
    })
})()

cartas.forEach((carta) => {
    carta.addEventListener('click', virarCarta)
})
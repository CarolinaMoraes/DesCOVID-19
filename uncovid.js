/**
 * Função que procura se no nó do HTML informado há qualquer menção
 * ao Coronavírus
 * @param {Node} node - nó do documento 
 */
function substituiCorona(node) {

    //somente substitui se o nó for do tipo texto
    /* @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType */
    if (node.nodeType === Node.TEXT_NODE) {
        node.data = node.data.replace(/coronavírus|coronavirus|corona virus|corona vírus|covid-19|covid/gi, (p) => {
            return "💉";
        });
    }

    /*se o nó for do tipo elemento e não for script usa reflection para ler os nós filhos
    * e procurar ocorrências de coronavírus
    * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType 
    */
    if (node.nodeType == 1 && node.nodeName.toUpperCase() != "SCRIPT") {
        for (let i = 0; i < node.childNodes.length; i++) {
            substituiCorona(node.childNodes[i]);
        }
    }
}

var extensaoAtiva = true;
browser.runtime.onMessage.addListener((message) => {
    console.log(message);
    if (message.command === "switch-atividade") {
        extensaoAtiva = message.status;
    }

    if (extensaoAtiva == 'true') {
        //inicia procurando pelo nó body do HTML
        substituiCorona(document.body);

        /**
         * Define um observador de mudanças na página,
         * para cada nó adicionado usa o substituiCorona()
         */
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        const newNode = mutation.addedNodes[i];
                        substituiCorona(newNode);
                    }
                }
            });
        });

        /**
         * Ativa o comportamento do observador
         */
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

});


let $switch = document.querySelector("#switch-extensao");
let $labelSwitch = document.querySelector("#label-switch-extensao");

//Texto padrão
$labelSwitch.innerText = "Extensão Ativada";
$switch.addEventListener('change', () => {
    $labelSwitch.innerText = $switch.checked ? "Extensão Ativada" : "Extensão Desativada";
    enviaStatus($switch.checked);
})

/**
 * Envia mensagem para o uncovid.js que a extensão está ativa ou não
 * @param {Boolean} atividade - está ativa ou não
 */
function enviaStatus(atividade) {
    browser.tabs.sendMessage({
        command: "switch-atividade",
        status: atividade
    });
}



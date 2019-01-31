
/* Script para contar o número de acessos em determinado formulário, incluindo uma contagem de 30 segundos de acesso até 
 * determinar se o acesso foi efetivo 
 */

/*
	OBSERVAÇÃO: Para mudar o tempo de contagem, altere a variavel "segundos" na LINHA 53. E a variavel "i" na LINHA 68.
*/

var segundos = 0; /* Contador em segundos */
var atingiu_tempo = false; /* Booleano para verificar se o tempo minimo dentro do formulário foi atingido */
var mudou_formulario; /* Variavel para verificar mudança no formulário */
var horario_entrada;  /* Horário de entrada do formulário anterior */
var horario_saida; /* Horário de saida do formulario  anterior */
var data_dia;  /* Função responsável por capturar a hora corrente fornecida pelo processador */
var data = new Date(); /* Classe para operações de data e hora */
var formulario_efetivo; /* Formulario Atual */
var nome_formulario;  /* Nome do formulario */
var nome_formulario_antes = null;  /* Nome do formulario anterior */
var mudou_formulario;  /* Variavel para indicar mudança de formulario */
$(document).ready(function(){ /* Evento do mouseover */
    $("form").mouseover(function(){
    	nome_formulario = this.name;  /* Retorna o nome do formulário onde o mouse esta sobre */
    	horario_entrada = data.getHours()+":"+data.getMinutes()+":"+data.getSeconds();  /* Hora de entrada */
    	mudou_formulario = mudanca_formulario(nome_formulario,nome_formulario_antes);  /* Retorna booleano para verificar mudança no formulario */
    	nome_formulario_antes = nome_formulario;  /* Atribuição do formulario atual no antigo */
    });
});
    

 /* Função principal para contar o tempo efetivo */
function tempoEfetivo() {
	if(mudou_formulario == true){  /* Verifica se a mudança foi verdadeira */
		segundos = 0;  /* Inicializa contador dos segundos */
		mudou_formulario = false;  /* Não houve mudança no contador */
		console.log("Você não atingiu o tempo necessario para efetivar o acesso");
		console.log("mudou formulario");
		if(atingiu_tempo == true){  /* Este IF verifica se o tempo contido no formulário foi efetivo ou seja  >= 30 segundos */
			var data2 = new Date();  /* Instancia hora */
			horario_saida = data2.getHours()+":"+data2.getMinutes()+":"+data2.getSeconds();  /* Atribui hora de saida */
			var data3 = new Date;  /* Instancia data */
			data_dia =  data3.getFullYear()+"-"+mesFormato(data3.getMonth())+data3.getMonth()+"-"+data3.getDate(); /* Atribui data atual */
			alert("Hora de Saida do Formulário Anterior: "+horario_saida);
		}
		atingiu_tempo = false;  /* Atribuição para "zerar" o alcance atingido do tempo minimo permitido de acesso */
	}
	if(atingiu_tempo == true){  /* Verifica se o tempo minimo foi atingido independente da mudança do formulario */
		console.log(atingiu_tempo);
		console.log("Atingiu tempo");
		formulario_efetivo = nome_formulario; /* O formulario atual é atualizado */
	}
	 /* (Verifica se os 30 segundos foram atingidos e o tempo minimo não foi atingido efetivamente) E se não houve mudança de formulário */
	if((segundos == 30 && atingiu_tempo == false) && mudou_formulario == false){ 
		alert(horario_entrada);
		alert("Hora de Entrada no Formulário Ante: "+horario_entrada);
		console.log("acesso efetivo");
		atingiu_tempo = true; /* A variável atingiu_tempo recebe "verdadeiro" */
		console.log(atingiu_tempo);
	}
    segundos = checarTempo(segundos);  /* Função que conta os segundos */
    console.log(segundos);
    document.getElementById("contador").innerHTML = segundos;  /* Imprime no site a contagem em segundos */
    var tempo = setTimeout(function(){ tempoEfetivo() }, 1000);  /* Variavel tempo que processa a função setTimeout, o que seria um relógio digital */
}

/* Conta os 30 segundos, se i menor que 30 continua contando senão o contador para */
function checarTempo(i) {
    if (i < 30) 
        i = 1 + i;
    return i;
}

/* Verifica se houve mudança no formulário, através do nome do formulário */
function mudanca_formulario(atual,antes){
	if(atual == antes)
		return false;
	else
		return true;
}

/* Função auxiliar para atribuir zero se o segundo for menor do que 10. Porque senão a hora fica no formato: 12:30:5 em vez de 12:30:05 */
function formatoSegundos(segundo){
	if(segundo<10)
		return "0";
	return "";
}

/* Função auxiliar para atribuir zero se o mes for menor do que 10. Porque senão a data fica 31/1/2019 em vez 31/01/2019 */
function mesFormato(mes){
	if(mes<10)
		return "0";
	return "";
}


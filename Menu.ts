import readlinesync = require('readline-sync')
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { colors } from './src/util/Colors';
import { Conta } from './src/model/Conta';
import { ContaController } from './src/controller/ContaController';

export function main(){

    let contas: ContaController = new ContaController();

    let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino: number;
    let titular: string;
    const tiposContas = ["Conta Corrente","Conta Poupanca"];

    console.log("\nCriar Contas\n");

    let cc1: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 123, 1, "João da Silva", 1000, 100.0);
    contas.cadastrar(cc1);

    let cc2: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 124, 1, "Maria da Silva", 2000, 100.0);
    contas.cadastrar(cc2);

    let cp1: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Mariana dos Santos", 4000, 12);
    contas.cadastrar(cp1);

    let cp2: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Juliana Ramos", 8000, 15);
    contas.cadastrar(cp2);

    contas.listarTodas();

    while(true){
        console.log( colors.bg.black, colors.fg.yellow,"********************************************");
        console.log("                                            ");
        console.log("         BANCO DO BRAZIL COM Z              ");
        console.log("                                            ");
        console.log("********************************************");
        console.log("       1- Criar conta                       ");
        console.log("       2- Listar todas as Contas            ");
        console.log("       3- Buscar conta por numero           ");
        console.log("       4- Atualizar dados da conta          ");
        console.log("       5- Apagar conta                      ");
        console.log("       6- Sacar                             ");
        console.log("       7- Depositar                         ");
        console.log("       8- Transferir valores entre contas   ");
        console.log("       9- Sair                              ");
        console.log("                                            ");
        console.log("********************************************");
        console.log("                                            ", colors.fg.greenstrong);

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao == 9){
            console.log("\nBanco do Brazil com Z - O seu futuro começa aqui!\n")
            sobre()
            console.log(colors.reset,"");
            process.exit(0);
        }

        switch(opcao) {
            case 1: 
            console.log(colors.fg.whitestrong, "\n\n Criar conta\n\n", colors.reset)
            
            console.log("Digite o Número da agência: ");
            agencia = readlinesync.questionInt("");

            console.log("Digite o Nome do titular da conta: ");
            titular = readlinesync.question("");

            console.log("\n Digite o tipo da Conta: ");
            tipo = readlinesync.keyInSelect(tiposContas, "", {cancel: false}) +1; // esse +1 é para não ficar indice 0

            console.log("\n Digite o Saldo da conta (R$): ");
            saldo = readlinesync.questionFloat("");

            switch(tipo){
                case 1:
                    console.log("Digite o limite da conta (R$): ");
                    limite = readlinesync.questionFloat("");
                    contas.cadastrar(
                        new ContaCorrente(contas.gerarNumero(), agencia, tipo, 
                        titular, saldo, limite));
                    break
                
                case 2: 
                    console.log("Digite o dia do aniversário da conta poupança: ");
                    aniversario = readlinesync.questionInt("");
                    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 
                    agencia, tipo, titular, saldo, aniversario));
            }

            keyPress()
            break;

            case 2:
                console.log(colors.fg.whitestrong,"\n\n Listar todas as contas\n\n", colors.reset)
                
                contas.listarTodas();
                
                keyPress()
                break

            case 3: 
                console.log(colors.fg.whitestrong,"\n\n Buscar conta por numero\n\n", colors.reset)
                
                console.log("Digite o numero da conta: ");
                numero = readlinesync.questionInt("");
                contas.procurarPorNumero(numero);

                keyPress()
                break

            case 4:
                console.log(colors.fg.whitestrong,"\n\n Atualizar dados da conta - por número \n\n", colors.reset)
                
                console.log("Digite o numero da conta: ");
                numero = readlinesync.questionInt("");

                let conta = contas.buscarNoArray(numero);

                if (conta != null){
                    console.log("Digite o numero da agência: ");
                    agencia = readlinesync.questionInt("");

                    console.log("Digite o nome do titular da conta: ");
                    titular = readlinesync.question("");

                    tipo = conta.tipo;

                    console.log("\n Digite o saldo da conta (R$): ");
                    saldo = readlinesync.questionFloat("");

                    switch (tipo){
                        case 1:
                            console.log("Digite o limite da conta (R$): ");
                            limite = readlinesync.questionFloat("");
                            contas.atualizar(
                                new ContaCorrente (numero, agencia, tipo, titular, saldo, limite));
                            break;

                        case 2:
                            console.log("Digite o dia do aniversário da conta poupanca: ");
                            aniversario = readlinesync.questionInt("");
                            contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo,
                                aniversario));
                            break;
                    }
                } else {
                    console.log(colors.fg.red, "\n A conta numero: " + numero + "não foi encontrada!,",
                        colors.reset);
                }
                
                keyPress()
                break

            case 5: 
                console.log(colors.fg.whitestrong,"\n\n Apagar uma conta \n\n", colors.reset)
                
                console.log("Digite o número da Conta: ");
                numero = readlinesync.questionInt("");
                contas.deletar(numero);
                
                keyPress()
                break
            
            case 6:
                console.log(colors.fg.whitestrong,"\n\n Saque\n\n", colors.reset)
                
                console.log("Digite o número da Conta: ");
                numero = readlinesync.questionInt("");

                console.log("\nDigite o valor do saque (R$): ");
                valor = readlinesync.questionFloat("");

                contas.sacar(numero, valor);
                
                keyPress()
                break

            case 7: 
                console.log(colors.fg.whitestrong,"\n\nDepósito\n\n", colors.reset)
                
                console.log("Digite o número da conta: ");
                numero = readlinesync.questionInt("");
                
                console.log("\n Digite o valor do deposito (R$): ");
                valor = readlinesync.questionFloat("");

                contas.depositar(numero, valor);

                keyPress()
                break

            case 8:
                console.log(colors.fg.whitestrong,"\n\nTransferência entre contas\n\n", colors.reset)
                
                console.log("Digite o numero da conta de Origem: ");
                numero = readlinesync.questionInt("");

                console.log("\n Digite o numero da conta de Destino: ");
                numeroDestino = readlinesync.questionInt("");

                console.log("\n Digite o valor do Depoósito (R$): ");
                valor = readlinesync.questionFloat("");

                contas.transferir(numero, numeroDestino, valor);
                
                keyPress()
                break

            default:
                console.log(colors.fg.whitestrong,"\nOpção inválida!\n", colors.reset)
                keyPress()
                break
            }

    }
}
export function sobre(): void{
                console.log("***********************************************");
                console.log("Projeto desenvolvido por: Milena Guerra")
                console.log("Generation Brasil - milenaoguerra5@gmail.com")
                console.log("https://github.com/milenaaguerra/conta_bancaria_novo")
            }

main();

function keyPress(): void{
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}
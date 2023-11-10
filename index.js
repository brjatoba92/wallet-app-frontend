/*Aqui vai checar se o email esta inserido na API
    COMO PRIMEIRO USO DEVE SER UTILIZADO O EMAIL TESTE@TESTE.COM
    Depois que fizer o registro pode ser utilizado qualquer email cadastrado
*/
const validateUser = async (email) => { /** inserido um elemento para a url da api */
    try {
        const result = await fetch( /** link da API */
            `https://mp-wallet-app-api.herokuapp.com/users?email=${email}`
        );
        const user = await result.json(); /** vai consultar o usuario no formato json  */
        return user; /** caso de sucesso vai fazer o login */
    } catch (error) {
        return{error}; /** caso de erro */
    }
};

/*Definindo a função de clicar para fazer o login referenciada no HTML */
const onClickLogin = async() => {
    const email = document.getElementById("input-email").value; /* Chamando o input no html que contem o email*/
    if (email.lenght <5 || !email.includes("@")){ /* condicionado um email valido se ele tiver mais que 5 caracteres e ter o @ */
        alert("Email invalido"); /** caso seja possua menos do que 5 carac e não ter o @ será mostrado o popup de alerta */
        return; /** interrope a execução mostrando o alerta */
    }
    const result = await validateUser(email); /** chamando a função de validação do usuario caso esteja na API */
    if(result.error){ /** chamando o erro na função validateUser*/
        alert("Falha ao validar email"); /** caso seja possua erro na função validateUser será mostrado o popup de alerta */
        return /** interrope a execução mostrando o alerta de erro da função validateUser */
    }
    /** definindo localmente 
     * email
     * nome
     * id
     * @WalletApp:userEmail ... : definido nome da aplicação (@WalletApp) seguido dos elementos a serem armazenados (email, nome, id) na constante result
     */
    localStorage.setItem("@WalletApp:userEmail", result.email); 
    localStorage.setItem("@WalletApp:userName", result.name);
    localStorage.setItem("@WalletApp:userId", result.id);
    window.open("src/pages/home/index.html", "_self"); /** abrir na home */
};

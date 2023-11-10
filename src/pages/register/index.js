/* Função de chamar a API agora com a função de POST - INCLUIR NOVOS ELEMENTOS
1 - Metodo try catch
a. Try:  blocos de codigos para testar se passam corretamente
b. Catch: blocos de codigos caso apresente erro(s) no try 

*/
const onCallRegister = async(email, name) => {
    try {
        const data = { /** bloco de dados com as varievis email e nome */
            email,
            name
        };

        const response = await fetch( /** bloco da API com a funçaõ de escrita (POST) de novos dados */
            'https://mp-wallet-app-api.herokuapp.com/users', 
            {
                method: "POST",
                mode: 'cors',
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
/** bloco de usuario via metodo json */
        const user = await response.json();
        return user;
        
    } catch (error) {
        return{error};
    }
};

/*  Fazendo o registro
 */
const onRegister = async() => {
    /* 1 - definindo variaveis a partir do id para nome e email, definidos via html */
    const email = document.getElementById("input-email").value;
    const name = document.getElementById("input-name").value;
    /* 2 - verificando se:
    a - o nome possui a quantidade de caracteres maior ou igual a 3 
    b - o email possua mais ou quantidade igual a 5 caracteres ou possua o @
    */
    if(name.lenght < 3){
        alert("Nome deve ter mais que 3 caracteres"); /** caso tenha menos mostrará o popup */
        return; /** parará mostrando */
    }

    if (email.lenght <5 || !email.includes("@")){
        alert("Email invalido"); /** caso atenda estas especifidades mostrará o popup */
        return; /** parará mostrando */
    }

/* Chamando a função onCalRegister
1 - Pega as variaveis email e nome definidas acima
2 - Se Apresentar erro mostrará um popup
*/
    const result = await onCallRegister(email, name); /* chama função com os dois elementos */

    if(result.error){ 
        alert("Falha ao validar email"); /*Mostra o popup de erro caso na função onCalRegister apresente erro  */
        return
    }
    /* caso de certo os dados do registro serão armazenados */
    localStorage.setItem("@WalletApp:userEmail", result.email);
    localStorage.setItem("@WalletApp:userName", result.name);
    localStorage.setItem("@WalletApp:userId", result.id);
    window.open("../home/index.html", "_self"); /* abre o index da home na mesma aba */
};

window.onload = () =>{
    const formulario = document.getElementById("form-register"); /* chama o formulario via id */
    formulario.onsubmit = (event) => {
        event.preventDefault();
        onRegister();
    };
};

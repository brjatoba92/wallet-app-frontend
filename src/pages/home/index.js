/*      Funções      
1 - onDeleteItem - contem a função onLoadFinancesData

2 - renderFinancesList - contem a função de onDeleteItem na sessão de delete
3 - renderFinanceElements

4 - onLoadFinancesData - chama os dois renders

5 - onLogout

6 - onLoadUserInfo
7 - onLoadCategories
8 - onOpenModal
9 - onCloseModal
10 - onCallAddFinance
11 - onCreateFinanceRelease: chama as funções onCloseModal, onLoadFinancesData e onCallAddFinance
12 - setInitialDate - chama a função onLoadFinancesData

window.onload: carregar todas as funções
 form.onsubmit: submeter o formulario do modal para que os elementos sejam adicionados na tabela
 Contem a onCreateFinanceRelease
*/

/* Ação de deletar*/
onDeleteItem = async(id) =>{
    try {
        const email = localStorage.getItem("@WalletApp:userEmail");
        await fetch(
            `https://mp-wallet-app-api.herokuapp.com/finances/${id}`, 
            {
                method: "DELETE",
                headers: {
                    email: email,
                },
            }
        );
        onLoadFinancesData() /* Tudo dando certo chama a função de onLoadFinancesData*/
    } catch (error) {
        alert("Erro ao deletar item")
        
    }

}

/** Carrega os elementos da tabela via id - cabeçalho e elementos */
const renderFinancesList = (data) => {
    const table = document.getElementById("finances-table"); /* id da tabela */
    table.innerHTML = ""; /** deixa o conteudo do cabeçalho sem interferencia na adição de novos itens do modal */
    /** 1 . Sessão de criação do cabeçalho */

    const tableHeader = document.createElement("tr"); /* cria o elemento de linhas da tabela */
    
    const titleText = document.createTextNode("Titulo"); /** cria o texto da coluna */
    const titleElement = document.createElement("th"); /** cria o elemento de cabeçalho da tabela */
    titleElement.appendChild(titleText); /* o texto é filho do elemento de cabeçalho */
    tableHeader.appendChild(titleElement); /** os elementos são filhos do cabeçaho */
   
    const categoryText = document.createTextNode("Categoria");
    const categoryElement = document.createElement("th");
    categoryElement.appendChild(categoryText);
    tableHeader.appendChild(categoryElement);

    const dateText = document.createTextNode("Data");
    const dateElement = document.createElement("th");
    dateElement.appendChild(dateText);
    tableHeader.appendChild(dateElement);

    const valueText = document.createTextNode("Valor");
    const valueElement = document.createElement("th");
    valueElement.className = "center";
    valueElement.appendChild(valueText);
    tableHeader.appendChild(valueElement);

    const actionText = document.createTextNode("Ação");
    const actionElement = document.createElement("th");
    actionElement.className = "right";
    actionElement.appendChild(actionText);
    tableHeader.appendChild(actionElement);

    table.appendChild(tableHeader); /** os cabelçalhos são filhos da tabela */



    /* 2 - Linhas */
    data.map((item) => {
        const tableRow = document.createElement("tr"); /** criação das linhas */
        tableRow.className = "mt smaller";
        
        //title
        const titleTd = document.createElement("td"); /** criação do elemento da linha */
        const titleText = document.createTextNode(item.title); /** criação do texto da linha com a propriedade de titulo */
        titleTd.appendChild(titleText);  /** texto é filho do elemento */
        tableRow.appendChild(titleTd); /** elemento é filho das linhas da tabela */

        //category
        const categoryTd = document.createElement("td");
        const categoryText = document.createTextNode(item.name); /** criação do texto da linha com a propriedade de nome */
        categoryTd.appendChild(categoryText);
        tableRow.appendChild(categoryTd);

        //date
        const dateTd = document.createElement("td")
        const dateText = document.createTextNode(
            new Date(item.date).toLocaleDateString()
        ); /** conteudo de data no formato especificado de data */
        dateTd.appendChild(dateText);
        tableRow.appendChild(dateTd);

        //value
        const valueTd = document.createElement("td");
        valueTd.className = "center"
        const valueText = document.createTextNode(
            new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL', 
            }).format(item.value)
        ); /** conteudo do valor no formato em real */
        valueTd.appendChild(valueText);
        tableRow.appendChild(valueTd);

        //delete

        const deleteTd = document.createElement("td"); /** criando elemento para deletar a linha */
        deleteTd.onclick = () => onDeleteItem(item.id); /** chamando a função de deletar */
        deleteTd.style.cursor = "pointer"
        deleteTd.className = "right"
        const deleteText = document.createTextNode("Deletar"); /** criando texto de deletar */
        deleteTd.appendChild(deleteText);
        tableRow.appendChild(deleteTd);

        //table add tablerow

        table.appendChild(tableRow) /** as linhas da tabela são filhas da tabela */

   });
};

/*  
* Checar a quantidade de items 
* Calcular as 
a. receitas (revenues)
b. despesas (expanses)
c. balanço (totalValue) 
 */

//1. Calculo
const renderFinanceElements = (data) => {
    const totalItems = data.length;
    const revenues = data
        .filter((item) => Number(item.value) > 0)
        .reduce((acc, item) => acc + Number(item.value), 0);
    const expenses = data
        .filter((item) => Number(item.value) < 0)
        .reduce((acc, item) => acc + Number(item.value), 0);
    const totalValue = revenues + expenses;

//2. Criando os boxs

    //a. render total items

    const financeCard1 = document.getElementById("finance-card-1");
    financeCard1.innerHTML = "";

    const totalSubtext = document.createTextNode("Total de lançamentos")
    const totalSubtextElement = document.createElement("h3")
    totalSubtextElement.appendChild(totalSubtext)
    financeCard1.appendChild(totalSubtextElement)

    const totalText = document.createTextNode(totalItems);
    const totalElement = document.createElement("h1");
    
    totalElement.id = "total-element";
    totalElement.className = "mt-smaller";
    totalElement.appendChild(totalText);
    financeCard1.appendChild(totalElement);

    //b. render revenues

    const financeCard2 = document.getElementById("finance-card-2");
    financeCard2.innerHTML = "";
    const revenueText = document.createTextNode(
        new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL', 
        }).format(revenues)
    );

    const revenueSubtext = document.createTextNode("Receitas")
    const revenueSubtextElement = document.createElement("h3")
    revenueSubtextElement.appendChild(revenueSubtext)
    financeCard2.appendChild(revenueSubtextElement)


    const revenueTextElement = document.createElement("h1");
    revenueTextElement.id = "revenue-element";
    revenueTextElement.className = "mt-smaller";
    revenueTextElement.appendChild(revenueText);
    financeCard2.appendChild(revenueTextElement);

    //c. render expanses

    const financeCard3 = document.getElementById("finance-card-3");
    financeCard3.innerHTML = "";
   

    const expansesSubtext = document.createTextNode("Despesas")
    const expansesSubtextElement = document.createElement("h3")
    expansesSubtextElement.appendChild(expansesSubtext)
    financeCard3.appendChild(expansesSubtextElement)


    const expansesText = document.createTextNode(
        new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL', 
        }).format(expenses)
    );

    const expansesTextElement = document.createElement("h1");
    expansesTextElement.id = "expanses-element";
    expansesTextElement.className = "mt-smaller";
    expansesTextElement.appendChild(expansesText);
    financeCard3.appendChild(expansesTextElement);

    //d. render balance

    const financeCard4 = document.getElementById("finance-card-4");
    financeCard4.innerHTML = "";
    
    const balanceSubtext = document.createTextNode("Balanço")
    const balanceSubtextElement = document.createElement("h3")
    balanceSubtextElement.appendChild(balanceSubtext)
    financeCard4.appendChild(balanceSubtextElement)
    
    const balanceText = document.createTextNode(
        new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL', 
        }).format(totalValue)
    );

    const balanceTextElement = document.createElement("h1");
    balanceTextElement.id = "balance-element";
    balanceTextElement.className = "mt-smaller";
    balanceTextElement.style.color =' #5936CD';
    balanceTextElement.appendChild(balanceText);
    financeCard4.appendChild(balanceTextElement);
};

/* Carregando os dados financeiros contidos na API  */
const onLoadFinancesData = async () => {
    try {
        const dateInputValue = document.getElementById("select-date").value;
        /*const date = dateInputValue;*/
        const email = localStorage.getItem("@WalletApp:userEmail"); /** obtendo o item de email da aplicação */
        /** Chamando API com o link das finanças via GET - função de obter os valores contidos na API */
        const result = await fetch(
            `https://mp-wallet-app-api.herokuapp.com/finances?date=${dateInputValue}`, 
            {
                method: "GET",
                headers: {
                    email: email,
                },
            }
        );
        const data = await result.json(); //exportar os dados por json
        // dois renders
        renderFinanceElements(data);
        renderFinancesList(data);
        return data;
    } catch (error) {
        return { error };
    }
};

//Função de sair
const onLogout = () => {
    localStorage.clear()
    window.open("../../../index.html", "_self")
}

/* Carregando os dados da aplicação para a navbar*/
const onLoadUserInfo = () => {
    
    // dados do armazenamento local da aplicação criada
    const email = localStorage.getItem('@WalletApp:userEmail');
    const name = localStorage.getItem('@WalletApp:userName');
    
    // chamando via id
    const navbarUserInfo = document.getElementById("navbar-user-container");
    const navbarUserAvatar = document.getElementById("navbar-user-avatar");

    //add user email

    const emailElement = document.createElement("p");
    const emailText = document.createTextNode(email); //criando texto do email a partir da constante criada acima
    emailElement.appendChild(emailText);
    navbarUserInfo.appendChild(emailElement);

    // add logout link

    const logoutElement = document.createElement("a");
    logoutElement.onclick = () => onLogout(); /** função de clicar para sair do dashboard */
    logoutElement.style.cursor = "pointer";
    const logoutText = document.createTextNode("sair"); /** criando texto */
    logoutElement.appendChild(logoutText);
    navbarUserInfo.appendChild(logoutElement);

    //add user avatar

    const nameElement = document.createElement("h3");
    const nameText = document.createTextNode(name.charAt(0)); /** pega a priemira letra do nome */
    nameElement.appendChild(nameText);
    navbarUserAvatar.appendChild(nameElement);
}
/*Categprias contidas na API */
const onLoadCategories = async() => {
    // fazendo o teste via try catch
    try {
        const categoriesSelect = document.getElementById("input-category"); /** categorias selecionadas via id */
        //link da api
        const response = await fetch(
            'https://mp-wallet-app-api.herokuapp.com/categories'
        );
        const categoriesResult = await response.json(); //exportando via json

        //console.log(categoriesResult)

        // listando as categorias disponiveis
        categoriesResult.map((category) => {
            const option = document.createElement("option");
            const categoryText = document.createTextNode(category.name);
            option.id = `category_${category.id}`;
            option.value = category.id;
            option.appendChild(categoryText);
            categoriesSelect.appendChild(option);
        })

        
    } catch (error) {
        alert("Erro ao adicionar categoria") //caso dê errado, apresente esse erro
        
    }
}

// sesão de abrir e fechar o modal
const onOpenModal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
}

const onCloseModal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "none";

};

// adicionando od dados financeiros para o email logado 

const onCallAddFinance = async(data) => {
    try {
        const email = localStorage.getItem('@WalletApp:userEmail');

        const response = await fetch(
            'https://mp-wallet-app-api.herokuapp.com/finances', 
            {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    email: email,
                },
                body: JSON.stringify(data),
            }
        );

        const user = await response.json();
        return user;
        
    } catch (error) {
        return{error};
    }
};


const onCreateFinanceRelease = async (target) => {
    try {
        const title = target[0].value;
        const value = Number(target[1].value);
        const date = target[2].value;
        const category = Number(target[3].value);
        const result = await onCallAddFinance({
            title,
            value,
            date,
            category_id: category,
        });
        /*console.log({ title, value, date, category });*/
        if (result.error){
            alert("Erro ao adicionar novo dado financeiro");
            return;
        }
        onCloseModal();
        onLoadFinancesData();
    } catch (error) {
        alert("Erro ao adicionar novo dado financeiro")
    }
}
/* Definir data*/
const setInitialDate = () => {
    const dateInput = document.getElementById("select-date"); /** identificando via id */
    const nowDate = new Date().toISOString().split("T")[0];
    console.log(nowDate)
    dateInput.value = nowDate;
    dateInput.addEventListener("change", () => {
        onLoadFinancesData(); /** modifica os dados financeiros a partir da data selecionada */
    });
};

// carrega todas as classes
window.onload = () => {
    setInitialDate(); // data
    onLoadUserInfo(); // usuario
    onLoadFinancesData(); // dados financeiros
    onLoadCategories(); // categorias
    
    
/*Chamando o form do index.html via id com o document.getElementById*/
    const form = document.getElementById("form-finance-release");
    form.onsubmit = (event) => {
        event.preventDefault();
        onCreateFinanceRelease(event.target);
    }
};



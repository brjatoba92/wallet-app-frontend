const onCallRegister = async(email, name) => {
    try {
        const data = {
            email,
            name
        };

        const response = await fetch(
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

        const user = await response.json();
        return user;
        
    } catch (error) {
        return{error};
    }
};


const onRegister = async() => {
    const email = document.getElementById("input-email").value;
    const name = document.getElementById("input-name").value;

    if(name.lenght < 3){
        alert("Nome deve ter mais que 3 caracteres");
        return;
    }

    if (email.lenght <5 || !email.includes("@")){
        alert("Email invalido");
        return;
    }

    const result = await onCallRegister(email, name);

    if(result.error){
        alert("Falha ao validar email");
        return
    }
    localStorage.setItem("@WalletApp:userEmail", result.email);
    localStorage.setItem("@WalletApp:userName", result.name);
    localStorage.setItem("@WalletApp:userId", result.id);
    window.open("../home/index.html", "_self");
};

window.onload = () =>{
    const formulario = document.getElementById("form-register");
    formulario.onsubmit = (event) => {
        event.preventDefault();
        onRegister();
    };
};

const onClickLogin = () => {
    const email = document.getElementById("input-email").value;
    if (email.lenght <5 || !email.includes("@")){
        alert("Email invalido")
        return;
    }
    localStorage.setItem("@WalletApp:useEmail", email);
    window.open("src/pages/home/index.html", "_self");
};

let status;

const messageElement = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const user_email = document.getElementById("user_email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`http://localhost:8000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_email: user_email,
                password: password
            }),
        });

        const data = await response.json();

        if (response.ok) {
            window.location.replace('../index.html');
        } else {
            messageElement.textContent = "Authification Failed!";
            setTimeout(() => {
                messageElement.textContent = null;
            }, 1500);
        }
    } catch (error) {
        console.error(error);
    }
});

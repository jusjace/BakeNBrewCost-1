/* ==========================
   AUTH SYSTEM (FIXED)
========================== */

/* SIGNUP */
document.getElementById("signupBtn")?.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) return alert("Enter email and password");

    const { error } = await supabaseClient.auth.signUp({ email, password });

    if (error) return alert(error.message);

    alert("Account created. Check your email.");
});


/* LOGIN */
document.getElementById("loginBtn")?.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) return alert(error.message);

    window.location.replace("index.html");
});


/* LOGOUT (FIXED RELIABILITY) */
document.addEventListener("click", async (e) => {

    if (e.target && e.target.id === "logoutBtn") {

        e.preventDefault();

        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            alert("Logout failed: " + error.message);
            return;
        }

        window.location.replace("login.html");
    }
});


/* SESSION GUARD */
async function checkUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();

    if (!user) {
        window.location.replace("login.html");
    }
}

if (window.location.pathname.includes("index.html")) {
    checkUser();
}


/* FORCE SYNC LOGOUT */
supabaseClient.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_OUT") {
        window.location.replace("login.html");
    }
});
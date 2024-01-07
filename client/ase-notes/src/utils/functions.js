import axios from "axios";

export async function getMaterii(facultate, an) {
    try {
        return await axios.get('http://localhost:3001/info/getMaterii', {
            params: {
                nume_facultate: facultate,
                an: an
            }
        });

    } catch (error) {
        console.error("Eroare la crearea cererii:", error.message);
    }
}

export async function getNotite(email) {
    try {
        return await axios.get('http://localhost:3001/notes/getNotite', {
            params: {
                email: email
            }
        });
    } catch (error) {
        console.error("Eroare la crearea cererii:", error.message);
    }
}

export async function getNotiteMaterie(id_materie, email) {
    try {
        return await axios.get('http://localhost:3001/notes/getNotiteMaterie', {
            params: {
                id_materie: id_materie,
                email: email
            }
        });
    } catch (error) {
        console.error("Eroare la crearea cererii:", error.message);
    }
}

export async function getAtasamente(email) {
    try {
        return await axios.get('http://localhost:3001/notes/getAtasamente', {
            params: {
                email: email
            }
        });
    } catch (error) {
        console.error("Eroare la crearea cererii:", error.message);
    }
}

export async function getMaterie(id_materie) {
    try {
        return await axios.get('http://localhost:3001/info/getMaterie', {
            params: {
                id_materie: Number(id_materie)
            }});

    } catch (error) {
        console.error("Eroare la crearea cererii:", error.message);
    }
}
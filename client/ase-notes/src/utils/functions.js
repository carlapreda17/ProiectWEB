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

export async function getNotitaCurs(idNr_notita_curs) {
    try {
        return await axios.get('http://localhost:3001/notes/getNotitaCurs', {
            params: {
                id_notita_curs: idNr_notita_curs
            }});

    } catch (error) {
        console.error("Eroare la crearea cererii:", error.message);
    }
}

export async function getNotitaSeminar(idNr_notita_seminar) {
    try {
        return await axios.get('http://localhost:3001/notes/getNotitaSeminar', {
            params: {
                id_notita_seminar: idNr_notita_seminar
            }});

    } catch (error) {
        console.error("Eroare la crearea cererii:", error.message);
    }
}

export async function updateNotitaCurs(data) {
    try {
        const response = await axios.put(`http://localhost:3001/notes/updateNotitaCurs/${data.id}`, {
            content: data.content

        });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Eroare la actualizarea notiței');
    }
}

export async function updateNotitaSeminar(data) {
    try {
        const response = await axios.put(`http://localhost:3001/notes/updateNotitaSeminar/${data.id}`, {
            content: data.content

        });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Eroare la actualizarea notiței');
    }
}

export async function getAtasamenteNotita(email, id_notita_curs, id_notita_seminar) {
    try {
        return await axios.get('http://localhost:3001/notes/getAtasamentePerNotita', {
            params: {
                email: email,
                id_notita_curs: id_notita_curs,
                id_notita_seminar: id_notita_seminar
            }
        });
    } catch (error) {
        console.error("Eroare la crearea cererii:", error.message);
    }
}

export const openImage = (src) => {
    const container = document.getElementById('attach-image-container');
    if(container) {
        container.style.display = 'block';
        const img = container.children[0].children[0];
        img.src = src;
    }

    const overlay = document.getElementById('overlay-photo');
    if(overlay) {
        overlay.style.display = 'block';
    }
}

export function closeImageAttachment() {
    const container = document.getElementById('attach-image-container');
    if(container) {
        container.style.display = 'none';
    }

    const overlay = document.getElementById('overlay-photo');
    if(overlay) {
        overlay.style.display = 'none';
    }
}
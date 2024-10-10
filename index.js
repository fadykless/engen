const functions = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

// Initialiser Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();

exports.getHexadecimalStream = functions.onRequest(async (req, res) => {
    try {
        // Lire un document Firestore spécifique (ajustez selon votre collection et document)
        const docRef = db.collection("prices").doc("Kinshasa");
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Document not found" });
        }

        const data = doc.data(); // Récupérer les données du document
        const textToConvert = JSON.stringify(data); // Convertir les données en string

        // Convertir le texte en hexadécimal
        const hexString = Buffer.from(textToConvert).toString("hex");

        // Définir le type MIME comme text/plain pour du texte en hexadécimal
        res.setHeader("Content-Type", "text/plain");

        // Retourner le flux hexadécimal
        return res.status(200).send(hexString);
    } catch (error) {
        console.error("Error fetching Firestore data: ", error);
        return res.status(500).send("Something went wrong!");
    }
});

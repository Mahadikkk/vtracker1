import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// --- Your Firebase Config ---
const firebaseConfig = {
  apiKey: "AIzaSyAYpW13lyQTT5XpsTpXqLQMhBwuVQ2qi80",
  authDomain: "vtracker1-e0278.firebaseapp.com",
  databaseURL: "https://vtracker1-e0278-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "vtracker1-e0278",
  storageBucket: "vtracker1-e0278.appspot.com",
  messagingSenderId: "866787627104",
  appId: "1:866787627104:web:b300c387f62863232c3305"
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- Today date ---
const today = new Date().toISOString().split("T")[0];
document.getElementById("todayDate").textContent = "Today: " + today;

// --- Load selected vehicle ---
const vehicleSelect = document.getElementById("vehicleSelect");

vehicleSelect.addEventListener("change", () => {
    loadVehicleData(vehicleSelect.value);
});

loadVehicleData("vehicle1"); // default

// --- Load data from Firebase ---
function loadVehicleData(vehicleId) {

    const dataRef = ref(db, `vehicles/${vehicleId}/${today}`);

    onValue(dataRef, snapshot => {
        const data = snapshot.val();

        if (data) {
            document.getElementById("distance").textContent = data.distance ?? "--";
            document.getElementById("fuel").textContent = data.fuel ?? "--";
        } else {
            document.getElementById("distance").textContent = "--";
            document.getElementById("fuel").textContent = "--";
        }
    });
}

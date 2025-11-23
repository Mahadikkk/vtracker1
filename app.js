// ----- FIREBASE IMPORT -----
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

// ----- YOUR FIREBASE CONFIG -----
const firebaseConfig = {
    apiKey: "AIzaSyAYpW13lyQTT5XpsTpXqLQMhBwuVQ2qi80",
    authDomain: "vtracker1-e0278.firebaseapp.com",
    databaseURL: "https://vtracker1-e0278-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "vtracker1-e0278",
    storageBucket: "vtracker1-e0278.firebasestorage.app",
    messagingSenderId: "G-GQLZZ0630H866787627104",
    appId: "1:866787627104:web:b300c387f62863232c3305"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ----- GET TODAY DATE -----
const today = new Date().toISOString().split("T")[0];
document.getElementById("todayDate").textContent = "Today: " + today;
saveVehicleData({
  speed: 45,
  temperature: 60,
  timestamp: Date.now()
});

const vehicleSelect = document.getElementById("vehicleSelect");

function loadVehicleData(vehicleId) {
    const todayRef = ref(db, `vehicles/${vehicleId}/${today}`);
    const historyRef = ref(db, `vehicles/${vehicleId}`);

    // Load Today's Data
    onValue(todayRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            document.getElementById("distance").textContent = data.distance;
            document.getElementById("fuel").textContent = data.fuel;
            document.getElementById("mileage").textContent = data.mileage;
        } else {
            document.getElementById("distance").textContent = "--";
            document.getElementById("fuel").textContent = "--";
            document.getElementById("mileage").textContent = "--";
        }
    });

    // Load Past Records
    onValue(historyRef, (snapshot) => {
        const records = snapshot.val();
        const list = document.getElementById("recordsList");
        list.innerHTML = "";

        for (const date in records) {
            if (date !== today) {
                const item = records[date];
                list.innerHTML += `
                    <div class="card">
                        <h4>${date}</h4>
                        Distance: ${item.distance} miles<br>
                        Fuel: ${item.fuel} gallons<br>
                        Mileage: ${item.mileage} MPG
                    </div>
                `;
            }
        }
    });
}

vehicleSelect.addEventListener("change", () => {
    loadVehicleData(vehicleSelect.value);
});

// Load first vehicle by default
loadVehicleData(vehicleSelect.value);

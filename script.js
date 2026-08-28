/* =========================================
   GOOGLE SHEETS CONNECTION
========================================= */

const API_URL = "https://script.google.com/macros/s/AKfycbyaYjktldtO9GjvLgfZ5_pNlnTq3TPmL25wmEnDfoEykgN5AljnwILtLmdv7aUlmCzO/exec";


async function loadDashboardData() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Gagal mengambil data dari Spreadsheet");
        }

        const data = await response.json();

        console.log("Data Spreadsheet:", data);


        // Total Proyek
        document.getElementById("totalProject").textContent =
            data.totalProject;


    } catch (error) {

        console.error("Gagal mengambil data:", error);

    }

}


// Load data saat website dibuka
loadDashboardData();


// Refresh otomatis setiap 10 detik
setInterval(loadDashboardData, 10000);
/* =========================================
   DATA PROJECT
========================================= */

const projects = [

    {
        nama: "Pengembangan Sistem Informasi Surveilans Terpadu",
        direktorat: "Ditjen P2P",
        pic: "dr. Andi Putra",
        periode: "01 Jan 2025 - 30 Nov 2025",
        progress: 75,
        status: "On Progress"
    },

    {
        nama: "Digitalisasi Puskesmas (SATUSEHAT Integration)",
        direktorat: "Ditjen Yankes",
        pic: "Ns. Rina Marlina",
        periode: "15 Jan 2025 - 15 Des 2025",
        progress: 60,
        status: "On Progress"
    },

    {
        nama: "Penguatan Labkesda & Labkesmas",
        direktorat: "Ditjen Kesmas",
        pic: "Siti Nurhaliza, SKM",
        periode: "01 Feb 2025 - 31 Okt 2025",
        progress: 40,
        status: "On Progress"
    },

    {
        nama: "Sistem Monitoring Ketersediaan Obat Nasional",
        direktorat: "Ditjen Farmalkes",
        pic: "apt. Dimas Anggara",
        periode: "01 Mar 2025 - 31 Des 2025",
        progress: 20,
        status: "Perlu Perhatian"
    },

    {
        nama: "Penguatan Promosi Kesehatan Berbasis Digital",
        direktorat: "Ditjen Kesmas",
        pic: "drg. Bella Anindya",
        periode: "10 Jan 2025 - 30 Sep 2025",
        progress: 100,
        status: "Selesai"
    }

];



/* =========================================
   RENDER TABLE
========================================= */

function renderTable(data = projects) {

    const table = document.getElementById("projectTable");

    table.innerHTML = "";

    data.forEach((project, index) => {

        let statusClass = "";

        if (project.status === "Selesai") {

            statusClass = "status-complete";

        } else if (project.status === "Perlu Perhatian") {

            statusClass = "status-attention";

        } else {

            statusClass = "status-progress";

        }


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>
                ${index + 1}
            </td>


            <td>
                ${project.nama}
            </td>


            <td>
                ${project.direktorat}
            </td>


            <td>
                ${project.pic}
            </td>


            <td>
                ${project.periode}
            </td>


            <td>

                <div class="progress-wrapper">

                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width: ${project.progress}%"
                        ></div>

                    </div>

                    <span class="progress-number">
                        ${project.progress}%
                    </span>

                </div>

            </td>


            <td>

                <span class="status ${statusClass}">

                    ${project.status}

                </span>

            </td>


            <td>

                <button
                    class="action-button"
                    title="Menu"
                >

                    <i data-lucide="more-vertical"></i>

                </button>

            </td>

        `;


        table.appendChild(row);

    });


    lucide.createIcons();

}



/* =========================================
   SEARCH
========================================= */

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener(
    "input",
    function () {

        const keyword =
            this.value.toLowerCase().trim();


        const filtered =
            projects.filter(project =>

                project.nama
                    .toLowerCase()
                    .includes(keyword)

                ||

                project.direktorat
                    .toLowerCase()
                    .includes(keyword)

                ||

                project.pic
                    .toLowerCase()
                    .includes(keyword)

            );


        renderTable(filtered);

    }
);



/* =========================================
   DONUT CHART
========================================= */

const progressCanvas =
    document.getElementById("progressChart");


new Chart(progressCanvas, {

    type: "doughnut",

    data: {

        labels: [
            "Selesai",
            "On Progress",
            "Terlambat",
            "Belum Dimulai"
        ],

        datasets: [

            {
                data: [
                    8,
                    7,
                    1,
                    8
                ],

                backgroundColor: [
                    "#0da39a",
                    "#a7cc4c",
                    "#f9c727",
                    "#c7c7c7"
                ],

                borderWidth: 0
            }

        ]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        cutout: "60%",

        plugins: {

            legend: {
                display: false
            }

        }

    }

});



/* =========================================
   MONTHLY LINE CHART
========================================= */

const monthlyCanvas =
    document.getElementById("monthlyChart");


new Chart(monthlyCanvas, {

    type: "line",

    data: {

        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun"
        ],

        datasets: [

            {
                label: "Progress",

                data: [
                    20,
                    38,
                    54,
                    63,
                    74,
                    90
                ],

                borderColor: "#0da39a",

                backgroundColor:
                    "rgba(13,163,154,0.10)",

                fill: true,

                tension: 0.35,

                pointRadius: 4,

                pointBackgroundColor: "#0da39a",

                borderWidth: 2

            }

        ]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            }

        },

        scales: {

            y: {

                min: 0,

                max: 100,

                ticks: {

                    callback: function(value) {

                        return value + "%";

                    },

                    font: {
                        size: 10
                    }

                },

                grid: {
                    color: "#edf0f0"
                }

            },

            x: {

                grid: {
                    display: false
                },

                ticks: {
                    font: {
                        size: 10
                    }
                }

            }

        }

    }

});



/* =========================================
   DIRECTORATE BAR CHART
========================================= */

const directorateCanvas =
    document.getElementById("directorateChart");


new Chart(directorateCanvas, {

    type: "bar",

    data: {

        labels: [

            "Setjen",
            "Ditjen P2P",
            "Ditjen Yankes",
            "Ditjen Farmalkes",
            "Ditjen Kesmas"

        ],

        datasets: [

            {

                data: [
                    6,
                    5,
                    5,
                    4,
                    4
                ],

                backgroundColor: "#0da39a",

                borderRadius: 2,

                barThickness: 18

            }

        ]

    },

    options: {

        indexAxis: "y",

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            }

        },

        scales: {

            x: {

                beginAtZero: true,

                ticks: {
                    stepSize: 2,
                    font: {
                        size: 10
                    }
                },

                grid: {
                    color: "#edf0f0"
                }

            },

            y: {

                grid: {
                    display: false
                },

                ticks: {
                    font: {
                        size: 10
                    }
                }

            }

        }

    }

});



/* =========================================
   INITIALIZE
========================================= */

renderTable();

lucide.createIcons();

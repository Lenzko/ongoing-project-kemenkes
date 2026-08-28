// ================================
// DATA PROJECT SEMENTARA
// ================================

const projects = [
    {
        nama: "Digitalisasi Data Laboratorium",
        pic: "Tim Informatika",
        status: "On Going",
        progress: 75
    },

    {
        nama: "Dashboard Monitoring Project",
        pic: "Tim Data",
        status: "On Going",
        progress: 60
    },

    {
        nama: "Sistem Monitoring Puskesmas",
        pic: "Tim IT",
        status: "Selesai",
        progress: 100
    },

    {
        nama: "Aplikasi Manajemen Biobank",
        pic: "Tim Research",
        status: "On Going",
        progress: 40
    }
];


// ================================
// LOAD DATA
// ================================

function loadData() {

    const table = document.getElementById("projectTable");

    table.innerHTML = "";

    projects.forEach((project, index) => {

        const row = document.createElement("tr");

        let statusClass =
            project.status === "Selesai"
            ? "status-completed"
            : "status-ongoing";

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>
                <strong>${project.nama}</strong>
            </td>

            <td>
                ${project.pic}
            </td>

            <td>
                <span class="status ${statusClass}">
                    ${project.status}
                </span>
            </td>

            <td>
                ${project.progress}%
            </td>
        `;

        table.appendChild(row);

    });


    updateSummary();

}


// ================================
// UPDATE SUMMARY
// ================================

function updateSummary() {

    const total = projects.length;

    const ongoing = projects.filter(
        project => project.status === "On Going"
    ).length;

    const completed = projects.filter(
        project => project.status === "Selesai"
    ).length;

    const totalProgress = projects.reduce(
        (sum, project) => sum + project.progress,
        0
    );

    const average =
        total > 0
        ? Math.round(totalProgress / total)
        : 0;


    document.getElementById("totalProject").textContent = total;

    document.getElementById("ongoingProject").textContent = ongoing;

    document.getElementById("completedProject").textContent = completed;

    document.getElementById("averageProgress").textContent =
        average + "%";
}


// ================================
// JALANKAN SAAT WEBSITE DIBUKA
// ================================

loadData();

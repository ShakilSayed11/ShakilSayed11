// public/script.js
const backendUrl = 'https://YOUR_VERCEL_FUNCTION_URL/api/getSheetData';  // Replace with your actual Vercel function URL

function fetchAndDownloadData() {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const agentName = document.getElementById('agentName').value.toLowerCase();
    const department = document.getElementById('department').value.toLowerCase();
    const region = document.getElementById('region').value.toLowerCase();

    fetch(`${backendUrl}?fromDate=${fromDate}&toDate=${toDate}&agentName=${agentName}&department=${department}&region=${region}`)
        .then(response => response.json())
        .then(data => {
            const rows = data.rows;
            const filteredRows = rows.filter(row => {
                const taskDate = new Date(row[3]);  // Assuming Task Date is in column 3
                return (taskDate >= new Date(fromDate) && taskDate <= new Date(toDate)) &&
                       (row[0].toLowerCase().includes(agentName)) &&
                       (row[1].toLowerCase().includes(department)) &&
                       (row[2].toLowerCase().includes(region));
            });
            generateExcelFile(filteredRows);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function generateExcelFile(data) {
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'filtered_data.xlsx');
}


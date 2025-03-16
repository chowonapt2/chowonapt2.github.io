function checkRoom() {
    const roomInput = document.getElementById('roomInput').value;
    //const csvUrl = 'https://raw.githubusercontent.com/your-username/your-repo-name/main/rooms.csv'; // CSV 파일 URL
    const csvUrl = '../jhw.csv'; // CSV 파일 URL

    fetch(csvUrl)
        .then(response => response.text())
        .then(csvText => {
            const csvData = csvText.split('\n').map(line => line.trim());
            const isMember = csvData.includes(roomInput);

            const resultDiv = document.getElementById('result');
            if (isMember) {
                resultDiv.innerText = '조합원입니다.';
            } else {
                resultDiv.innerText = '소유주입니다.';
            }
        })
        .catch(error => console.error('Error:', error));
}

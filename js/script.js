// 동 콤보박스 초기화
function initBuildingSelect() {
    const buildingSelect = document.getElementById('buildingSelect');
    for (let i = 201; i <= 212; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = `${i}동`;
        buildingSelect.appendChild(option);
    }
}

// 입력받은 정보로 CSV 데이터와 비교
function checkRoom() {
    const buildingSelect = document.getElementById('buildingSelect');
    const selectedBuilding = buildingSelect.value;
    const roomInput = document.getElementById('roomInput').value;

    if (!roomInput) {
        alert('호수를 입력해주세요.');
        return;
    }

    const csvUrl = '../jhw.csv';

    fetch(csvUrl)
        .then(response => response.text())
        .then(csvText => {
            const csvData = csvText.split('\n').map(line => line.trim());
            const roomCode = `${selectedBuilding}${roomInput}`;

            const isMember = csvData.includes(roomCode);

            const resultDiv = document.getElementById('result');
            if (isMember) {
                resultDiv.innerText = '조합원입니다.';
            } else {
                resultDiv.innerText = '소유주입니다.';
            }
        })
        .catch(error => console.error('Error:', error));
}

// 초기화
initBuildingSelect();

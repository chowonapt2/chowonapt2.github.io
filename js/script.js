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

function processCsvData(csvText) {
    const csvData = csvText.split('\n').map(line => {
        // 각 행을 객체로 변환
        const parts = line.trim().split(',');
        return {
            roomCode: parts[0],
            additionalInfo: parts[1] || ''
        };
    });

    return csvData;
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
        const csvData = processCsvData(csvText);

        // 사용자 입력과 비교
        const buildingSelect = document.getElementById('buildingSelect');
        const selectedBuilding = buildingSelect.value;
        const roomInput = document.getElementById('roomInput').value;

        const roomCode = `${selectedBuilding}${roomInput}`;

        const matchingRoom = csvData.find(data => data.roomCode === roomCode);

        const resultDiv = document.getElementById('result');
        if (matchingRoom) {
            if (matchingRoom.additionalInfo) {
                resultDiv.innerText = `조합원입니다. 추가 정보: ${matchingRoom.additionalInfo}`;
            } else {
                resultDiv.innerText = '조합원입니다.';
            }
        } else {
            resultDiv.innerText = '소유주입니다.';
        }
    })
    .catch(error => console.error('Error:', error));
}

// 초기화
initBuildingSelect();

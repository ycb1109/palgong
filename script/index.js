    
    const cardList = document.getElementById('cardList');
    const cards = document.querySelectorAll('.card_item');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');

    const totalCards = cards.length;
    let currentIndex = 0;

    // 슬라이드 업데이트 함수
    function updateSlider(index) {
        // 카드가 없으면 동작 안 함
        if (totalCards === 0) return;

        currentIndex = index;

    // 1. active 클래스 변경 (크기 확장을 위해)
    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx === currentIndex);
    });

    // 2. 하단 막대 위치 이동 (비율 계산)
    const fillWidthPercent = 100 / totalCards; // 카드 5개 기준 20%
    progressFill.style.width = `${fillWidthPercent}%`;
    progressFill.style.left = `${currentIndex * fillWidthPercent}%`;
  }

  // 막대 클릭 이벤트 (클릭한 위치로 슬라이드 이동)
  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // 막대 내부 클릭 X 좌표
    const barWidth = rect.width;
    
    // 클릭 위치의 비율에 따라 인덱스 계산
    let newIndex = Math.floor((clickX / barWidth) * totalCards);
    if (newIndex >= totalCards) newIndex = totalCards - 1;
    if (newIndex < 0) newIndex = 0;

    updateSlider(newIndex);
  });

  // 카드 직접 클릭 시 해당 카드로 이동
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      updateSlider(idx);
    });
  });

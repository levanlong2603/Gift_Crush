const bgMusic = document.getElementById('bgMusic');
  const giftBox = document.getElementById('giftBox');
  const container = document.getElementById('container');
  const message = document.getElementById('message');
  const messageText = document.getElementById('messageText');
  const messageGif = document.getElementById('messageGif');

  // Mảng chứa các tin nhắn và ảnh tương ứng
  const messages = [
  {
    text: "M làm t rung động hơi nhiều rồi đó 😾",
    gif: "https://i.pinimg.com/originals/d9/4e/ef/d94eef3fc4f4af08ac6ed201017cd4c6.gif"
  },
  {
    text: "Nhắn với m xong t cười như thằng khùng 😭",
    gif: "https://i.pinimg.com/originals/33/76/db/3376dbdfc1b6e8b71a2ea7353e4fc0f2.gif"
  },
  {
    text: "Crush t chắc đáng yêu dữ lắm á",
    gif: "https://i.pinimg.com/originals/3a/fc/12/3afc12d6744a68594d29eb565c62244c.gif"
  },
  {
    text: "Ủa sao m dễ thương hoài vậy?",
    gif: "https://i.pinimg.com/originals/6a/ec/ee/6aecee875e4844f34a1539054bf8aa8a.gif"
  },
  {
    text: "Con mèo này mê m rồi 😼💗",
    gif: "https://i.pinimg.com/originals/be/39/be/be39be7b9b6a02e06f892798063406c8.gif"
  }
];


  let currentIndex = 0;
  let intervalId;

  // Hàm gõ chữ từng ký tự với delay
  function typeWriter(text, element, delay = 100) {
    return new Promise((resolve) => {
      element.textContent = "";
      let i = 0;
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, delay);
        } else {
          resolve();
        }
      }
      type();
    });
  }

  async function showMessage(index) {
  const msg = messages[index];
  messageGif.src = msg.gif;

  // Hiện message, xóa fade-out nếu có, bật active để hiện
  message.classList.remove('fade-out');
  message.classList.add('active');

  // Gõ chữ
  await typeWriter(msg.text, messageText, 100);

  // // Dừng 3s để xem tin nhắn
  // await new Promise(r => setTimeout(r, 3000));

  // Bắt đầu hiệu ứng mờ dần
  message.classList.add('fade-out');

  // Chờ hiệu ứng fadeOut 0.5s
  await new Promise(r => setTimeout(r, 500));

  // Ẩn message trước khi chuyển sang tin nhắn kế tiếp
  message.classList.remove('active');
}
async function startMessageRotation() {
  currentIndex = 0;

  while (currentIndex < messages.length) {
    await showMessage(currentIndex);
    currentIndex++;
  }

  countdown();
}



  giftBox.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.currentTime = 59.5;
      bgMusic.play();
    }

    // Thu nhỏ hộp quà
    giftBox.classList.add('shrink');

    // Tạo 20 trái tim nhỏ
    for(let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.textContent = '❤️';

      // Vị trí start: giữa hộp quà
      heart.style.left = '50%';
      heart.style.top = '50%';
      heart.style.transformOrigin = 'center';

      // random góc bay ra và khoảng cách
      const angle = Math.random() * 2 * Math.PI; // radian
      const distance = 50 + Math.random() * 100; // px

      // Tính toán x, y dịch chuyển dùng biến CSS để animate
      const x = (Math.cos(angle) * distance).toFixed(2) + 'px';
      const y = (Math.sin(angle) * distance).toFixed(2) + 'px';

      heart.style.setProperty('--x', x);
      heart.style.setProperty('--y', y);

      container.appendChild(heart);

      // Xoá trái tim sau khi animation kết thúc
      heart.addEventListener('animationend', () => {
        heart.remove();
      });
    }

    // Ẩn hộp quà sau khi thu nhỏ xong animation (600ms)
    setTimeout(() => {
      giftBox.style.display = 'none';
      setTimeout(() => {
        startMessageRotation();
      }, 1500);
    }, 600);
  });

  function countdown() {
  const countdownEl = document.getElementById('countdown');

  // Ẩn tin nhắn và ảnh NGAY khi bắt đầu đếm
  message.classList.remove('active');

  let count = 3;
  countdownEl.textContent = count;
  countdownEl.style.display = 'block';

  const interval = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(interval);
      countdownEl.style.display = 'none';
      resetGiftBox();
    } else {
      countdownEl.textContent = count;
    }
  }, 1000);
}


function resetGiftBox() {
  giftBox.classList.remove('shrink');
  giftBox.style.display = 'flex';
  currentIndex = 0;
  message.classList.remove('active'); // Ẩn tin nhắn & ảnh
}

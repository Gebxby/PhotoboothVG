// main.js

// Simpan pilihan strip ke localStorage hanya di chooseStrip.ejs
typeof chooseStrip !== 'undefined' && (window.chooseStrip = function(strip) {
    localStorage.setItem('selectedStrip', strip);
    document.getElementById('nextPage').classList.remove('hidden');
});

document.getElementById('nextPage')?.addEventListener('click', () => {
    window.location.href = '/ambilFoto';
});

// Ambil pilihan strip untuk digunakan di ambilFoto.ejs
document.addEventListener("DOMContentLoaded", function () {
    const selectedStrip = localStorage.getItem('selectedStrip');
    if (!selectedStrip) {
        alert("Silakan pilih strip terlebih dahulu!");
        window.location.href = '/chooseStrip';
        return;
    }

    const video = document.getElementById('video');
    const captureButton = document.getElementById('capture');
    const photoGrid = document.getElementById('photoGrid');
    const downloadButton = document.getElementById('downloadStrip');
    const photos = [];

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => { video.srcObject = stream; })
        .catch(error => { console.error("Error mengakses kamera:", error); });

    captureButton.addEventListener('click', () => {
        if (photos.length >= 6) {
            alert("Maksimal 6 foto!");
            return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageUrl = canvas.toDataURL('image/png');
        photos.push(imageUrl);
        updatePhotoGrid();
    });

    function updatePhotoGrid() {
        photoGrid.innerHTML = '';
        photos.forEach((photo, index) => {
            const photoItem = document.createElement('div');
            photoItem.classList.add('photo-item');
            const img = document.createElement('img');
            img.src = photo;
            photoItem.appendChild(img);
            photoGrid.appendChild(photoItem);
        });
        downloadButton.disabled = photos.length < 3;
    }

    downloadButton.addEventListener('click', async () => {
        if (photos.length < 6) {
            alert("Harus minimal 6 foto untuk mengunduh!");
            return;
        }
        const stripCanvas = document.createElement('canvas');
        const ctx = stripCanvas.getContext('2d');
        const stripImg = new Image();
        stripImg.src = selectedStrip;
        stripImg.onload = function () {
            stripCanvas.width = stripImg.width;
            stripCanvas.height = stripImg.height;
            ctx.drawImage(stripImg, 0, 0);
            photos.forEach((photo, i) => {
                const img = new Image();
                img.src = photo;
                img.onload = function () {
                    ctx.drawImage(img, 50, 100 + (i * 150), 100, 100);
                    if (i === photos.length - 1) {
                        const link = document.createElement('a');
                        link.href = stripCanvas.toDataURL('image/png');
                        link.download = "strip_photobooth.png";
                        link.click();
                    }
                };
            });
        };
    });
});
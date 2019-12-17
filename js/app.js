// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    reqServiceWorker();
    reqNotif();
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

function reqServiceWorker() {
    return navigator.serviceWorker
        .register("/service-worker.js")
        .then(function (registration) {
            console.log("Pendaftaran ServiceWorker berhasil");
            return registration;
        })
        .catch(function (error) {
            console.log("Pendaftaran ServiceWorker gagal", error);
        });
}

function reqNotif() {
    if ("Notification" in window) {
        Notification.requestPermission().then(function (result) {
            if (result == "denied") {
                console.log("Fitur notifikasi tidak diijinkan");
            } else if (result == "default") {
                console.error("Pengguna menutup kontak dialog permintaan ijin.");
                return;
            }

            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function (registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BOA5Gm5tB0J0fVj_hDwTFfnc-XV0MVorQLZ1oeqwH2D04gsBploYWsvrW7wdAHRjkOr6GydMylfQDkkmMtCPZ5o")
                    }).then(function (subscribe) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function (e) {
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });
            }

        });
    } else {
        console.log("Browser tidak mendukung notifikasi");
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
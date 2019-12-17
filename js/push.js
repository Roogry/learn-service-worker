var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BOA5Gm5tB0J0fVj_hDwTFfnc-XV0MVorQLZ1oeqwH2D04gsBploYWsvrW7wdAHRjkOr6GydMylfQDkkmMtCPZ5o",
    "privateKey": "n5u-x0SRSVCqB4b--baQ_1mD7roAN9EvG0Ud5Wlkc0g"
};


webPush.setVapidDetails(
    'mailto:jodiemantra@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dJQhp2eMF6M:APA91bE5okYgNXxVW4544QCQDVe4e56RfPyL10BC8hMjcLeL6_UW8WJpvN_3FiMX4WjMQL_G1JLLNlnEzyJn88jrXXEsO43_O3flzf-_467RsCmHTOScnOkjQqXJA49Cb5-p3VM0yOiE",
    "keys": {
        "p256dh": "BOgUquZXM9kMEQcVus/lJhX0peTtqwlEQA90Qa6SFitNj8s7aQBSzWf3nugzbnSPw2DFrZxHWFhxBHfrUxXf6Zg=",
        "auth": "tKezOhaCUoBrCkjwaAuI7Q=="
    }
};
var payload = 'Horayy! Submissionku di accept reviewer :D';

var options = {
    gcmAPIKey: '42671555596',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
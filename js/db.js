var dbPromised = idb.open("the-champions", 1, function (upgradeDb) {
    upgradeDb.createObjectStore("matches", {
        keyPath: "id"
    });
});

function setWatchlist(match) {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            var tx = db.transaction("matches", "readwrite");
            var store = tx.objectStore("matches");
            store.add(match);
            resolve(tx.complete);
        });
    });
}

function getWatchlist() {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            var tx = db.transaction("matches", "readonly");
            var store = tx.objectStore("matches");
            resolve(store.getAll());
        });
    });
}

function delWatchlist(id) {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            var tx = db.transaction("matches", "readwrite");
            var store = tx.objectStore("matches");
            resolve(store.delete(id));
        });
    });
}
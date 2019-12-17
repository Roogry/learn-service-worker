const base_url = "https://api.football-data.org/v2/";
const API_KEY = "1e68cbb6a65a45fdad2f63d6ea30ed4c";

function status(response) {

    if (response.status !== 200) {
        console.log("Error : " + response.status);

        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

//jika error
function error(error) {
    console.log("Error : " + error);
}

function getTopTeams() {

    var request = new Request(base_url + "competitions/CL/standings?standingType=TOTAL", {
        headers: new Headers({
            "X-Auth-Token": API_KEY
        })
    });

    if ('caches' in window) {
        caches.match(request).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    setTopTeam(data);
                })
            }
        })
    }

    fetch(request)
        .then(status)
        .then(json)
        .then(function (data) {
            setTopTeam(data);
        })
        .catch(error);
}

function getMatches(statusMatch, jml) {

    var request = new Request(base_url + "competitions/CL/matches?status=" + statusMatch, {
        headers: new Headers({
            "X-Auth-Token": API_KEY
        })
    });

    if ('caches' in window) {
        caches.match(request).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    setMatches(data, statusMatch, jml);
                })
            }
        })
    }

    fetch(request)
        .then(status)
        .then(json)
        .then(function (data) {
            setMatches(data, statusMatch, jml);
        })
        .catch(error);
}

function setTopTeam(data) {
    var cardHTML = "";

    data.standings[0].table.slice(0, 3).forEach(function (data) {
        var team = data.team;
        var imgUrl = team.crestUrl.replace(/^http:\/\//i, 'https://');

        cardHTML += `
            <div class="col m4 s12 ml-0 my-15">
                <img class="materialboxed mx-auto" height="100"
                    src="${imgUrl}">
                <h5 class="text-primary text-w500 mt-8 mx-auto px-0">${team.name}</h5>
            </div>
        `;
    });

    if (cardHTML != null) {
        return (document.getElementById("card-top").innerHTML = cardHTML);
    }
}


function setMatches(data, statusMatch, jml) {
    var cardHTML = "";

    switch (statusMatch) {
        case "FINISHED":

            getWatchlistNoCard().then(function (matchesDB) {

                data.matches.slice(0, jml).forEach(function (match) {

                    var star = isExist(match.id, matchesDB);

                    cardHTML += `
                        <div class="card-lastest col m10 s12 offset-m1 mt-25 z-depth-3-2 bradius-15 ">
    
                            <div class="watchlist valign-wrapper">
                                <i id="match_${match.id}" class="material-icons text-accent" onclick="toogleWatchlist('${match.id}', '${match.stage}', '${match.homeTeam.name}', '${match.awayTeam.name}', '${match.score.fullTime.homeTeam}', '${match.score.fullTime.awayTeam}', '${match.status}')">${star}</i> <span
                                    class="my-auto hide-on-small-only text-secondary">Watchlist</span>
                            </div>
    
                            <p class="text-primary text-12em text-bold mt-20 mb-0">${match.stage.replace(/_/g, " ")}</p>
    
                            <div class="row my-0">
    
                                <div class="col m5 s12">
                                    <h5 class="text-primary">${match.homeTeam.name}</h5>
                                </div>
    
                                <div class="col m2 s12 px-0 parent-score">
                                    <span class="text-white text-12em text-bold bg-score bg-blue bradius-10">${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}</span>
                                </div>
    
                                <div class="col m5 s12">
                                    <h5 class="text-primary">${match.awayTeam.name}</h5>
                                </div>
    
                            </div>
    
                            <p class="text-primary text-12em text-bold mt-0 mb-20 hide-on-small-only">${match.status}</p>
    
                        </div>
                    `;
                });

                if (cardHTML != null && cardHTML != "") {
                    return (document.getElementById("card-lastest").innerHTML = cardHTML);
                }
            });

            break;

        default:

            getWatchlistNoCard().then(function (matchesDB) {
                data.slice(0, jml).forEach(function (match) {

                    var star = isExist(match.id, matchesDB);

                    cardHTML += `
                        <div class="card-lastest col m10 s12 offset-m1 mt-25 z-depth-3-2 bradius-15 ">

                            <div class="watchlist valign-wrapper">
                                <i id="match_${match.id}" class="material-icons text-accent" onclick="toogleWatchlist('${match.id}', '${match.stage}', '${match.homeTeam}', '${match.awayTeam}', '${match.scoreHome}', '${match.scoreAway}', '${match.status}')">${star}</i> <span
                                    class="my-auto hide-on-small-only text-secondary">Watchlist</span>
                            </div>

                            <p class="text-primary text-12em text-bold mt-20 mb-0">${match.stage.replace(/_/g, " ")}</p>

                            <div class="row my-0">

                                <div class="col m5 s12">
                                    <h5 class="text-primary">${match.homeTeam}</h5>
                                </div>

                                <div class="col m2 s12 px-0 parent-score">
                                    <span class="text-white text-12em text-bold bg-score bg-blue bradius-10">${match.scoreHome} : ${match.scoreAway}</span>
                                </div>

                                <div class="col m5 s12">
                                    <h5 class="text-primary">${match.awayTeam}</h5>
                                </div>

                            </div>

                            <p class="text-primary text-12em text-bold mt-0 mb-20 hide-on-small-only">${match.status}</p>

                        </div>
                    `;
                });

                if (cardHTML != null && cardHTML != "") {
                    console.log(cardHTML);
                    return (document.getElementById("card-lastest").innerHTML = cardHTML);
                }
            });

    }

}

function getWatchlistMatch() {
    getWatchlist().then(function (matches) {
        setMatches(matches, "", 1000);
    });
}

function getWatchlistNoCard() {
    return new Promise(function (resolve, reject) {
        getWatchlist().then(function (matches) {
            resolve(matches);
        });
    });
}

function toogleWatchlist(id, stage, homeTeam, awayTeam, scoreHome, scoreAway, status) {
    var icon = document.getElementById("match_" + id);
    if (icon.innerHTML === "star_border") {
        var match = {
            id: id,
            stage: stage,
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            scoreHome: scoreHome,
            scoreAway: scoreAway,
            status: status
        };

        setWatchlist(match).then(function () {
            icon.innerHTML = "star";

            M.toast({
                html: 'added to watchlist',
                classes: 'rounded'
            });
        }).catch(function () {
            M.toast({
                html: 'failed add to watchlist',
                classes: 'rounded'
            });
        });

    } else {
        delWatchlist(id).then(function () {
            icon.innerHTML = "star_border";

            M.toast({
                html: 'removed from watchlist',
                classes: 'rounded'
            });

            getWatchlistMatch();
        }).catch(function (error) {

            console.log(error);

            M.toast({
                html: 'failed remove to watchlist',
                classes: 'rounded'
            });
        });
    }

}

function convertDate(date) {
    var date = new Date(date);
    var month = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    var hours = "";
    if (date.getHours().toString().length == 1) {
        hours = "0" + date.getHours();
    } else {
        console.log(date.getHours().toString().length);
        hours = date.getHours();
    }

    return month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " / " + hours + "." + date.getMinutes();
}

function isExist(id, matchesDB) {
    var value = "star_border";

    matchesDB.forEach(function (match) {
        if (match.id == id) {
            value = "star";
        }
    });

    return value;
}
var friends = require('../data/friends.js');


module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function(req, res) {
        var totalDif = 0;
        var bestFri = {
            name: '',
            photo: '',
            friendDif: 1000
        };

        var userData = req.body;
        var userName = userData.name;
        var userScore = userData.score;
        var b = userScore.map(function(item) {
            return parseInt(item, 10);
        });
        userData = {
            "name": req.body.name,
            "photo": req.body.photo,
            "score": b
        }

        console.log('Name: ' + userName);
        console.log('Score: ' + userScore);
        var sum = b.reduce((a, b) => a + b, 0);
        console.log('Score' + sum);
        console.log('Best match friend ' + bestFri.friendDif);
        console.log('-------------------------------------');

        for (var i = 0; i < friends.length; i++) {
            totalDif = 0;
            console.log(friends[i].name);
            console.log('Best match ' + bestFri.friendDif);

            var bfriScore = friends[i].score.reduce((a, b) => a + b, 0);
            console.log('Total friend score ' + bfriScore);
            totalDif += Math.abs(sum - bfriScore);
            console.log('---------------------> ' + totalDif);

            if (totalDif <= bestFri.friendDif) {
                bestFri.name = friends[i].name;
                bestFri.photo = friends[i].photo;
                bestFri.friendDif = totalDif;

                if (bestFri.name == userName) {
                    bestFri.name = 'Keanu Reeves';
                    bestFri.photo = 'https://vignette.wikia.nocookie.net/americandadfanon/images/7/7f/Reginald_the_Koala.png/revision/latest/scale-to-width-down/340?cb=20190618202529';
                    bestFri.friendDif = 10;
                }
            
            }
            console.log(totalDif + ' Total Differences');
        }
        console.log(bestFri);

            friends.push(userData);
            console.log('New User Added');
            console.log(userData);

            res.json(bestFri);
    });

};
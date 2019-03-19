// Require path

var path = require("path");

// Import friends
var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // List of friends
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // Add new friend
    app.post("/api/friends", function (req, res) {
        // Best friend match
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 100000
        };

        // Takes userData object from survey
        var userData = req.body;
        // Scores array from survey
        var userScores = userData.scores;

        // Variable to hold difference in scores
        var totalDifference;

        // Loop through all of the friends
        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            totalDifference = 0;

            // Loop through each friend's scores
            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                // Calculate the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            };

            // If the sum of differences is less than the differences of the current best match
            if (totalDifference <= bestMatch.friendDifference) {
                // Reset the bestMatch to be the new friend
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            };
        };

        // Add new user's input to friends database
        friends.push(userData);

        // Send response
        res.json(bestMatch);
    });
};
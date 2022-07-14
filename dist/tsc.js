var btn = document.getElementById('btn');
var input = document.getElementById('inpUser');
var errorP = document.getElementById('error-Field');
var userDescription = document.getElementById('user-desc');
console.log(input);
input.addEventListener('input', function (e) {
    var start = Date.now();
    fetch("https://api.github.com/users/".concat(e.target.value), {
        method: 'GET'
    })
        .then(function (response) {
        return new Promise(function (resolve) {
            var diff = Date.now() - start;
            if (diff < 1000) {
                setTimeout(function () {
                    console.log('1000');
                    resolve(response);
                }, 1000 - diff);
                userDescription.innerHTML = "\n                <img src=\"src/assets/loader.gif\"/>\n              ";
            }
            else {
                resolve(response);
            }
        });
    })
        .then(function (res) {
        if (res.status === 200) {
            errorP.innerHTML = '';
            console.log(res.body);
        }
        else {
            errorP.innerHTML = "I don`t find this user";
        }
        return res.json();
    }).then(function (data) {
        var imgContent;
        if (data.avatar_url === null) {
            imgContent = "src/assets/img_null.png";
            console.log(imgContent);
        }
        else {
            imgContent = data.avatar_url;
        }
        userDescription.innerHTML = "\n      <div class=\"userCard\">\n        <img class=\"user_avatar\" src=".concat(imgContent, "/>\n        <div class=\"userCard_desc\">\n          <h3 class=\"title\">User Info</h3>\n          <p>UserName: ").concat(data.name === null ? '-' : data.name, "</p>\n          <p>UserEmail:  ").concat(data.email === null ? '-' : data.email, "</p>\n          <p>UserCompany:  ").concat(data.company === null ? '-' : data.company, "</p>\n          <p>UserAdress:  ").concat(data.location === null ? '-' : data.location, "</p>\n          <p>User Amount of reposetories:  ").concat(data.public_repos === null ? 0 : data.public_repos, "</p>\n        </div>\n      </div>\n  \n      ");
        console.log(data);
    });
});

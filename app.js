const http = new abHTTP();

const UI = function () {}

UI.prototype.displayUsers = function (users) {
    const div = document.getElementById('users');
    let output = '';

    if (users.length > 1) {
        users.forEach(user => {
            output += `<div class="box"><ul>
            <li>ID: ${user.id}</li>
            <li>NAME: ${user.name}</li>
            <li>USENAME: ${user.username}</li>
            <li>EMAIL: ${user.email}</li></ul><a href="#" class="button button-primary" id="${user.id}">Delete <i class="fas fa-trash"></i></a></div>
            `;
        })
    } else {
        output += `<div class="box"><ul>
            <li>ID: ${users.id}</li>
            <li>NAME: ${users.name}</li>
            <li>USENAME: ${users.username}</li>
            <li>EMAIL: ${users.email}</li></ul><a href="#" class="button button-primary" id="${users.id}">Delete <i class="fas fa-trash"></i></a></div>
            `;
    }
    div.innerHTML = output;
}

UI.prototype.showMessage = function (message, className) {
    const form = document.querySelector('form'),
         container = form.parentElement;
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    container.insertBefore(div, form);
    setInterval(() => {
        div.style = 'display:none;';
    }, 3000);
}
// listening to events

document.getElementById('url-form').addEventListener("submit", function (e) {
    const url = document.getElementById('url-input').value;  

    const ui = new UI();
    http.get(url, function(err, users) {
        
        // check if error is empty
        if (err === null) {
            // display the fethced users
            ui.displayUsers(users);
        } else {
            // display error on the ui
            ui.showMessage(err, 'error');
        }


    });
    e.preventDefault();
})

document.getElementById('user-form').addEventListener('submit', function (e) {
    const name = document.getElementById('name').value,
        username = document.getElementById('username').value,
        email = document.getElementById('email').value,
        url = document.getElementById('url-input').value,
        ui = new UI(),
        data = { 
            name: name, 
            username: username, 
            email: email
        };

    http.post(url, data, function (err, res) {
        
        // check if error is empty
        if (err) {
            // display the fetched users
            ui.showMessage(err, 'error');
        } else {
            // display error on the ui
            ui.displayUsers(res);
        }

    })

    e.preventDefault();
})

// UPDATNG
document.getElementById('update').addEventListener('click', function (e) {
    const name = document.getElementById('name').value,
        username = document.getElementById('username').value,
        email = document.getElementById('email').value,
        url = document.getElementById('url-input').value,
        ui = new UI(),
        data = { 
            name: name, 
            username: username, 
            email: email
        };

    http.put(url, data, function (err, res) {
        
        // check if error is empty
        if (err) {
            // display the fetched users
            ui.showMessage(err, 'error');
        } else {
            // display error on the ui
            ui.displayUsers(res);
        }

    })

    e.preventDefault();
})


// DELETING
document.getElementById('delete').addEventListener('click', function (e) {
    
    const ui = new UI(),
        url = document.getElementById('url-input').value;

    http.delete(url, function (err, res) {
        // check if error is empty
        if (err) {
            // display the fetched users
            ui.showMessage(err, 'error');
        } else {
            // display error on the ui
            ui.showMessage(res, 'success');
        }
    })

    e.preventDefault();

})
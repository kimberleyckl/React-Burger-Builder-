// Chien-Li LIN, 955333969, clin834
const ini = () =>{
    document.getElementById("home_menu").style.display = "block";
    document.getElementById("Products_menu").style.display = "none";
    document.getElementById("Location_menu").style.display = "none";
    document.getElementById("News_menu").style.display = "none";
    document.getElementById("Guest_menu").style.display = "none";
    document.getElementById("sign_menu").style.display = "none";
}

const homeclicked = () => {
    document.getElementById("home_menu").style.display = "block";
    document.getElementById("Products_menu").style.display = "none";
    document.getElementById("Location_menu").style.display = "none";
    document.getElementById("News_menu").style.display = "none";
    document.getElementById("Guest_menu").style.display = "none";
    document.getElementById("home_tab").style.backgroundColor = "antiquewhite";
    document.getElementById("Products_tab").style.backgroundColor = "transparent";
    document.getElementById("Location_tab").style.backgroundColor = "transparent";
    document.getElementById("News_tab").style.backgroundColor = "transparent";
    document.getElementById("Guest_tab").style.backgroundColor = "transparent";
    document.getElementById("Sign_tab").style.backgroundColor = "transparent";
    document.getElementById("sign_menu").style.display = "none";

}

const productclicked = () => {
    document.getElementById("home_menu").style.display = "none";
    document.getElementById("Products_menu").style.display = "block";
    document.getElementById("Location_menu").style.display = "none";
    document.getElementById("News_menu").style.display = "none";
    document.getElementById("Guest_menu").style.display = "none";
    document.getElementById("sign_menu").style.display = "none";
    document.getElementById("Products_tab").style.backgroundColor = "antiquewhite";
    document.getElementById("home_tab").style.backgroundColor = "transparent";
    document.getElementById("Location_tab").style.backgroundColor = "transparent";
    document.getElementById("News_tab").style.backgroundColor = "transparent";
    document.getElementById("Sign_tab").style.backgroundColor = "transparent";
    document.getElementById("Guest_tab").style.backgroundColor = "transparent";
}

const locationclicked = () => {
    document.getElementById("home_menu").style.display = "none";
    document.getElementById("Products_menu").style.display = "none";
    document.getElementById("Location_menu").style.display = "block";
    document.getElementById("News_menu").style.display = "none";
    document.getElementById("Guest_menu").style.display = "none";
    document.getElementById("sign_menu").style.display = "none";
    document.getElementById("Location_tab").style.backgroundColor = "antiquewhite";
    document.getElementById("home_tab").style.backgroundColor = "transparent";
    document.getElementById("Products_tab").style.backgroundColor = "transparent";
    document.getElementById("News_tab").style.backgroundColor = "transparent";
    document.getElementById("Guest_tab").style.backgroundColor = "transparent";
    document.getElementById("Sign_tab").style.backgroundColor = "transparent";
}

const newsclicked = () => {
    document.getElementById("home_menu").style.display = "none";
    document.getElementById("Products_menu").style.display = "none";
    document.getElementById("Location_menu").style.display = "none";
    document.getElementById("News_menu").style.display = "block";
    document.getElementById("Guest_menu").style.display = "none";
    document.getElementById("sign_menu").style.display = "none";
    document.getElementById("News_tab").style.backgroundColor = "antiquewhite";
    document.getElementById("home_tab").style.backgroundColor = "transparent";
    document.getElementById("Products_tab").style.backgroundColor = "transparent";
    document.getElementById("Location_tab").style.backgroundColor = "transparent";
    document.getElementById("Guest_tab").style.backgroundColor = "transparent";
}

const guestclicked = () => {
    document.getElementById("home_menu").style.display = "none";
    document.getElementById("Products_menu").style.display = "none";
    document.getElementById("Location_menu").style.display = "none";
    document.getElementById("News_menu").style.display = "none";
    document.getElementById("Guest_menu").style.display = "block";
    document.getElementById("sign_menu").style.display = "none";
    document.getElementById("Guest_tab").style.backgroundColor = "antiquewhite";
    document.getElementById("home_tab").style.backgroundColor = "transparent";
    document.getElementById("Products_tab").style.backgroundColor = "transparent";
    document.getElementById("Location_tab").style.backgroundColor = "transparent";
    document.getElementById("News_tab").style.backgroundColor = "transparent";
    document.getElementById("Sign_tab").style.backgroundColor = "transparent";
}

const signclicked = () => {
    document.getElementById("home_menu").style.display = "none";
    document.getElementById("Products_menu").style.display = "none";
    document.getElementById("Location_menu").style.display = "none";
    document.getElementById("News_menu").style.display = "none";
    document.getElementById("Guest_menu").style.display = "none";
    document.getElementById("sign_menu").style.display = "block";
    document.getElementById("Sign_tab").style.backgroundColor = "antiquewhite";
    document.getElementById("home_tab").style.backgroundColor = "transparent";
    document.getElementById("Products_tab").style.backgroundColor = "transparent";
    document.getElementById("Location_tab").style.backgroundColor = "transparent";
    document.getElementById("News_tab").style.backgroundColor = "transparent";
    document.getElementById("Guest_tab").style.backgroundColor = "transparent";
}

//VCARD
const contacts = document.getElementById('contacts');
const vcardFetch =
    fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard',
        {headers: {"Accept": "application/json"}});
const vcardPromise = vcardFetch.then((response) => response.text());
vcardPromise.then((data) => {
    //const a = JSON.stringify(data);
    const a = data.split('\r\n');
    const EMAIL = a[5];
    const ADR = a[4].split(":");
    const TEL = a[3];
    let div = document.createElement('div');
    div.innerHTML = "<address><div class='titles'>" + "Address: " + ADR[1].slice(2).split(';').join(' ') + "</div>"+ "<br/>" +
        "<div class='descriptions'>Tel: <a href = 'tel:" + TEL.slice(15).split(' ').join('') + "'>" + TEL.slice(15) + "</a></div>"+"<br/>" +
        "<div class='descriptions'>EMAIL: <a href ='mailto: " + EMAIL.slice(6) +"'>"+EMAIL.slice(6)+"</a> <div class='descriptions'></address>"+"<br/>"+
        "<a href = http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard>Add us to your Address Book</a>"
    contacts.appendChild(div);
});


//NEWS
const newsFetch = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news',
    {
        headers: { "Accept": "application/json" },
    });
const newsFetchPromise = newsFetch.then((response) => response.json());
newsFetchPromise.then((data) => {
    const newsOutput = document.getElementById('newsOutput');
    for (let i = 0; i < data.length; i++) {
        let div = document.createElement('div');
        div.innerHTML =
            "<div class='titles'>" + data[i].titleField + "</div>" + "<br/>" +
            "<a href='" + data[i].linkField + "'>" +
            "<img src='" + data[i].enclosureField.urlField + "' width='50%'  />" + "<br/>" +
            "</a>" +
            "<div class='dates'>" + data[i].pubDateField + "</div>" + "<br/>" +
            "<div class='descriptions'>" + data[i].descriptionField + "</div>" + "<hr width ='70%'/>"
        newsOutput.appendChild(div);
    }
});



//Product
const productFetch = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items',
    {
        headers: { "Accept": "application/json" },
    });
const productPromise = productFetch.then((response) => response.json());
productPromise.then((data) => {
    const productOutput = document.getElementById('productOutput');
    for (let i = 0; i < data.length; i++) {
        let div = document.createElement('div');
        div.innerHTML =
            "<img id = 'productimg' src = 'http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=" + data[i].ItemId + "' />" +
            "<div id = 'producttext'><div class='titles'>" + data[i].Title + "</div>" + "<br/>" +
            "<div id = 'price'>Price: " + data[i].Price + "</div>" + "<br/>" +
            "<div>Origin: " + data[i].Origin + "</div>" + "<br/>" + "<hr width ='70%'/></div>"
        productOutput.appendChild(div);
    }
});


//search
searchFunc = () => {
    const productOutput = document.getElementById('productOutput');
    productOutput.innerHTML = ' '
    let inputs = document.getElementById('searched').value;
    const searchFetch = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term=' + inputs,
        {
            headers: { "Accept": "application/json" },
        });
    const searchPromise = searchFetch.then((response) => response.json());
    searchPromise.then((data) => {
        
        for (let i = 0; i < data.length; i++) {
            let div = document.createElement('div');
            div.innerHTML =
                "<img id = 'productimg' src = 'http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=" + data[i].ItemId + "' />" +
                "<div id = 'producttext'><div class='titles'>" + data[i].Title + "</div>" + "<br/>" +
                "<div id = 'price'>Price: " + data[i].Price + "</div>" + "<br/>" +
                "<div>Origin: " + data[i].Origin + "</div>" + "<br/>" + "<hr width ='70%'/></div>"
            productOutput.appendChild(div);
        }
    });
}

//COMMENTS
const commentsOutput = document.getElementById('commentsOutput');
const commentsFetch = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/htmlcomments');
const commentsPromise = commentsFetch.then((response) => response.text());
commentsPromise.then((data) => {
    let div = document.createElement('div');
    div.innerHTML = data;
    commentsOutput.appendChild(div)
});

//post
commented = () =>{    
    const users = document.getElementById('users').value;
    const comments = document.getElementById('comments').value;
    const postPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/comment?name='+ users,
        {
            headers: {
                // "Accept": 'application/json',
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(comments)
        });    
    postPromise.then((data) =>{
        document.getElementById('users').value = ' ';
        document.getElementById('comments').value = ' ';
        const commentsOutput = document.getElementById('commentsOutput');
        commentsOutput.innerHTML = ' ';
        const commentsFetch = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/htmlcomments');
        const commentsPromise = commentsFetch.then((response) => response.text());
        commentsPromise.then((data) => {
            let div = document.createElement('div');
            div.innerHTML = data;
            commentsOutput.appendChild(div)
        });
    })
}

// registeration
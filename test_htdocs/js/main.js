const baseURL = 'http://openam.example.com:8080/openam'
const appURL = 'http://app.example.com:8000'

$(document).ready(function(){
    main()
});

function main () {
    getUserData()
}

/* Decode JWT to ssoToken */
function getSSOToken () {
    let tokenJWT = document.cookie;
    let base64Url = tokenJWT.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    let payload = JSON.parse(window.atob(base64));
    let ssoToken = payload.forgerock.ssotoken
    return ssoToken
}

/* Get User Session */
getUserSession = async () =>  {
    let resData = null;
    let ssoToken = getSSOToken()
    let url = `${baseURL}/json/sessions?tokenId=${ssoToken}&_action=getSessionInfo`
    await axios({
        method: 'POST',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-API-Version': 'resource=2.1'
        }
    }).then((res) => {
        resData = res.data
    }).catch((error) => {
        console.log(error)
    })
    return resData
}

/* Get User Data */
getUserData = async () =>  {
    let resData = await getUserSession()
    let loginId = resData.username
    let ssoToken = getSSOToken()
    let url = `${baseURL}/json/users/${loginId}`
    axios({
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'iPlanetDirectoryPro': ssoToken
        }
    }).then((res) => {
        userData = res.data
        $('#userDisplay').text(userData.username)
        console.log(userData)
    }).catch((error) => {
        console.log(error)
    })
}

/* Log Out */ 
logOut = async () => {
    let ssoToken = getSSOToken()
    let url = `${baseURL}/json/sessions/?_action=logout`
    await axios({
        method: 'POST',
        url: url,
        headers: {
            'iPlanetDirectoryPro': ssoToken,
            'Content-Type': 'application/json',
            'Accept-API-Version': 'resource=2.1'
        }
    }).then((res) => {
        //successLogout(res)
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
    setTimeout(() => { location.reload() }, 100);
}

// successLogout = async (resLogout) => {
    
// }

// function getRequestAuthen (ssoToken) {
//     var url = 'http://openam.example.com:8080/openam/json/realms/root/authenticate'
//     var data;
//     axios({
//         method: 'POST',
//         url: url,
//         headers: {
//             'X-OpenAM-Username': 'beer',
//             'Content-Type': 'application/json',
//             'X-OpenAM-Password': 'P@ssw0rd',
//             'Accept-API-Version': 'resource=2.0, protocol=1.0'
//         }
//     })
//     .then((response) => {
//         //resultElement.innerHTML = generateSuccessHTMLOutput(response);
//         var a;
//         a = response.data
//         return console.log(a.tokenId)
//     })
//     .catch((error) => {
//         //resultElement.innerHTML = generateErrorHTMLOutput(error);
//         console.log(error)
//     })
// }


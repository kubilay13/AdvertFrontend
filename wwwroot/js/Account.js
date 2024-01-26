function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function sendEmailForReset() {
    debugger
    var email = $("#Email").val(); // E-posta adresini input alanından al
    // E-posta adresi boş mu kontrolü yap
    if (!email) {
        alert("Lütfen bir e-posta adresi girin.");
        return;
    }
    else if (!isValidEmail(email)) {
        swal.fire("Hata!", "Geçerli bir Email giriniz!", "error");
    }

    // API isteği gönder
    $.ajax({
        url: 'https://localhost:7160/api/Account/ForgotPassword?email=' + email,
        method: 'POST',
        success: function (response) {
            console.log(response);
            alert("Şifre sıfırlama bağlantısı gönderildi.");
            window.location.href = "/Login/SignIn";
        },
        error: function (error) {
            console.error(error);
            alert("İşlem sırasında bir hata oluştu.");
        }
    });
}

function newPassword() {
    var userId = userData.userId;
    var token = userData.token;
    var password = $("#password").val();
    console.log("User ID:", userId);
    console.log("Token:", token);
    if (!password) {
        alert("Lütfen yeni bir şifre giriniz");
        return;
    }
    $.ajax({
        url: 'https://localhost:7160/api/Account/ResetPassword?userId=' + userId + '&token=' + token + '&password=' + password,
        method: 'POST',
        // contentType: 'application/json',
        // data: JSON.stringify({ userId: userId, token: token, password: password }),
        success: function (response) {
            console.log(response);
            alert("Şifre değiştirme başarılı.");
            window.location.href = "/Login/SignIn";

        },
        error: function (error) {
            debugger
            console.error(error.responseText.error);
            alert("İşlem sırasında bir hata oluştu." + error.responseText);
        }
    });
}

function SignIn() {
    debugger
    var email = $("#Email").val();
    var password = $("#Password").val();
    if (!password) {
        alert("Lütfen yeni bir şifre giriniz");
        return;
    }
    else if (!isValidEmail(email)) {
        swal.fire("Hata!", "Geçerli bir Email giriniz!", "error");
    }
    $.ajax({
        url: 'https://localhost:7160/api/Account/SignIn',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email: email, password: password }),
        success: function (response) {
            console.log(response);
            alert("Giriş Başarılı");
            window.location.href = "/Login/ConfirmCode?Email=" + response.data;

        },
        error: function (error) {
            debugger
            console.error(error.responseText.error);
            alert("İşlem sırasında bir hata oluştu." + error.responseText);
        }
    });
}

function SignUp() {
    debugger
    var FirstName = $('#FirstName').val();
    var LastName = $('#LastName').val();
    var Email = $('#Email').val().trim();
    var Password = $('#Password').val().trim();
    var Passwordlenght = Password.length;//Metin uzunluğu sorgulama
    var ConfirmPassword = $('#ConfirmPassword ').val().trim();
    var Adress = $('#Adress').val().trim();
    var PhoneNumber = $('#PhoneNumber').val().trim();
    var UserName = $('#UserName').val();
    var hasUpperCase = /[A-Z]/.test(Password);//Büyük harf sorgulama
    var hasLowerCase = /[a-z]/.test(Password);//Küçük harf sorgulama
    var specialCharacters = ['!', '.', ',', ';', ':', '?'];
    var containsSpecialCharacter = false;
    for (var i = 0; i < specialCharacters.length; i++) {
        if (Password.includes(specialCharacters[i])) {
            containsSpecialCharacter = true;
            break;
        }
    }

    if (Email == "") {
        swal.fire("Hata!", "Email giriniz!", "error");
    }
    else if (!isValidEmail(Email)) {
        swal.fire("Hata!", "Geçerli bir Email giriniz!", "error");
    }
    else if (UserName == "") {
        swal.fire("Hata!", "Kullanıcı Adı Giriniz!", "error");
    }
    else if (Password == "") {
        swal.fire("Hata!", "Şifre Giriniz!", "error");
    }
    else if (Passwordlenght < 6 || hasLowerCase == false || hasUpperCase == false || containsSpecialCharacter == false) {//includes ile noktalama işaretlerini sorguladık.
        swal.fire("Hata!", "Şifrenizde büyük,küçük harf ve uzunluğa dikkat ediniz!", "error");
    }
    else if (ConfirmPassword != Password) {
        swal.fire("Hata!", "Şifreleriniz eşleşmiyor!", "error");
    }
    else if (FirstName == "") {
        swal.fire("Hata!", "İsim Giriniz!", "error");
    }
    else if (LastName == "") {
        swal.fire("Hata!", "Soyisim Giriniz!", "error");
    }
    else if (Adress == "") {
        swal.fire("Hata!", "Adres Giriniz!", "error");
    }
    else if (PhoneNumber == "") {
        swal.fire("Hata!", "Telefon Numarası Giriniz!", "error");
    }
    else {
        $.ajax({
            url: 'https://localhost:7160/api/Account/CreateAccount',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                email: Email,
                userName: UserName,
                password: Password,
                firstName: FirstName,
                lastName: LastName,
                password: Password,
                adress: Adress,
                phoneNumber: PhoneNumber,

            }),
            success: function (response) {
                console.log(response);
                swal.fire("Kayıt Başarılı,Mailinize Gelen Linkten Mailinizi Onaylayınız", "succes");
                window.location.href = "/Home/Index";

            },
            error: function (error) {
                debugger
                console.error(error.responseText.error);
                alert("İşlem sırasında bir hata oluştu." + error.responseText);
            }
        });
    }
}

function SubmitConfirmCode() {
    debugger
    var Email = ConfirmData.email;
    var code1 = document.getElementById("code1").value;
    var code2 = document.getElementById("code2").value;
    var code3 = document.getElementById("code3").value;
    var code4 = document.getElementById("code4").value;
    var code5 = document.getElementById("code5").value;
    var code6 = document.getElementById("code6").value;

    // Değerleri birleştir
    var ConfirmCode = code1 + code2 + code3 + code4 + code5 + code6;
    if (!ConfirmCode) {
        alert("Lütfen kodu tam giriniz!");
        return;
    }
    $.ajax({
        url: 'https://localhost:7160/api/Account/ConfirmCode?Email=' + Email + '&ConfirmCode=' + ConfirmCode,
        method: 'POST',
        success: function (response) {
            debugger
            if (response.acsessToken != null) {
                localStorage.setItem('token', response.token);
                alert("Giriş Başarılı");
                if (response.name == "Admin") {
                    window.location.href = "/Admin/Index";
                }
                else if (response.name == "Moderator") {
                    window.location.href = "/Admin/Index"
                }
                else if (response.name == "User") {
                    window.location.href = "/User/Index"
                }
                else {
                    alert("Kullanıcı Bulunamadı,Tekrar Giriş Yapınız");
                    window.location.href = "/Login/SignUp"
                }
            }
            else {
                alert("Token Boş,Tekrar Giriş Yapınız");
                window.location.href="/Login/SignUp"
            }

        },
        error: function (error) {
            debugger
            console.error(error.responseText.error);
            alert("İşlem sırasında bir hata oluştu." + error.responseText);
        }
    });
}
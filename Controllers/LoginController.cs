using Microsoft.AspNetCore.Mvc;

namespace AdvertFrontend.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult SignIn()
        {
            return View();
        }
        public IActionResult SignUp()
        {
            return View();
        }
        public async Task<IActionResult> ConfirmMail(string userId, string token)
        {
            string apiUrl = $"https://localhost:7160/api/Account/ConfirmEmail?userId={userId}&token={token}";


            // HttpClient oluşturun
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    // API'ye GET isteği gönderin
                    HttpResponseMessage response = await client.GetAsync(apiUrl);

                    // Başarılı bir yanıt alınırsa
                    if (response.IsSuccessStatusCode)
                    {
                        // API'den gelen içeriği alın
                        string apiResponse = await response.Content.ReadAsStringAsync();

                        // İstediğiniz işlemleri gerçekleştirin
                        // ...

                        return RedirectToAction("SuccessConfirmMail");
                    }
                    else
                    {
                        // Hata durumunu ele alın
                        return RedirectToAction("ErrorConfirmMail");

                    }
                }
                catch (Exception ex)
                {
                    // İstisna durumu ele alın
                    return Content($"API'ye yönlendirme sırasında bir hata oluştu: {ex.Message}");
                }
            }
        }
        public IActionResult SuccessConfirmMail()
        {
            return View();
        }
        public IActionResult ErrorConfirmMail()
        {
            return View();
        }
        public IActionResult ConfirmCode()
        {
            return View();
        }
    }
}

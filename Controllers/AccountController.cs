using AdvertFrontend.Models;
using Microsoft.AspNetCore.Mvc;

namespace AdvertFrontend.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        public IActionResult ForgotPassword()
        {
            return View();
        }
        public IActionResult ResetPassword(string userId, string Token)
        {
            NewPasswordViewModel successNewPassword = new NewPasswordViewModel();
            successNewPassword.UserId = userId;
            successNewPassword.Token = Token;
            return View(successNewPassword);

        }
    }
}

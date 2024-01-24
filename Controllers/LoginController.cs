using Microsoft.AspNetCore.Mvc;

namespace AdvertFrontend.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult SignIn()
        {
            return View();
        }
    }
}

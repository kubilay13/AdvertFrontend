using Microsoft.AspNetCore.Mvc;

namespace AdvertFrontend.Controllers
{
    public class OrderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

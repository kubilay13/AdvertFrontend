using Microsoft.AspNetCore.Mvc;

namespace AdvertFrontend.Controllers
{
	public class AccountController : Controller
	{
		public IActionResult ForgotPassword()
		{
			return View();
		}
	}
}

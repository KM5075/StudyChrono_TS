using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StudyChrono_TS.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TempController : ControllerBase
{
    public TempController()
    {
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<string> Get()
    {
        return  "Hello World!";
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyChrono_TS.Server.Models;

namespace StudyChrono_TS.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudyRecordController : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task< ActionResult<IEnumerable<StudyRecord>>> GetStudyRecords()
    {
        throw new NotImplementedException();
    }
}

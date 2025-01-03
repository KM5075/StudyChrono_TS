using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyChrono_TS.Server.Models;
using StudyChrono_TS.Server.Repositories;

namespace StudyChrono_TS.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudyRecordController : ControllerBase
{
    private readonly IRepositories _repositories;

    public StudyRecordController(IRepositories repositories)
    {
        _repositories = repositories;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task< ActionResult<IEnumerable<StudyRecord>>> GetStudyRecords()
    {
        var records = await _repositories.GetStudyRecords();
        if (records == null || records.Count() == 0)
        {
            return NoContent();
        }

        return records.ToList();
    }
}

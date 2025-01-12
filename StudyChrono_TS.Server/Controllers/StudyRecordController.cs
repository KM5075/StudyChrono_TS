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

    /// <summary>
    /// Initializes a new instance of the <see cref="StudyRecordController"/> class.
    /// </summary>
    /// <param name="repositories">The repositories.</param>
    public StudyRecordController(IRepositories repositories)
    {
        _repositories = repositories;
    }

    /// <summary>
    /// Retrieves all study records.
    /// </summary>
    /// <returns>A list of study records.</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<ActionResult<IEnumerable<StudyRecord>>> GetStudyRecords()
    {
        var records = await _repositories.GetStudyRecords();
        if (records == null || records.Count() == 0)
        {
            return NoContent();
        }

        return records.ToList();
    }

    /// <summary>
    /// Adds a new study record.
    /// </summary>
    /// <param name="record">The study record to add.</param>
    /// <returns>The created study record.</returns>
    [HttpPost()]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<StudyRecord>> AddStudyRecord(StudyRecord record)
    {
        var newRecord = await _repositories.AddStudyRecord(record);
        return CreatedAtAction(null, new { id = newRecord.Id }, newRecord);
    }

    /// <summary>
    /// Updates a study record.
    /// </summary>
    /// <param name="id">The ID of the study record to update.</param>
    /// <param name="record">The updated study record.</param>
    /// <returns>The updated study record.</returns>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<StudyRecord>> UpdateStudyRecord(int id, StudyRecord record)
    {
        var exist = await _repositories.FindStudyRecord(id);
        if (!exist)
        {
            return NotFound();
        }

        if (id != record.Id)
        {
            return BadRequest();
        }

        var updatedRecord = await _repositories.UpdateStudyRecord(record);
        return updatedRecord;
    }

    /// <summary>
    /// Deletes a study record.
    /// </summary>
    /// <param name="id">The ID of the study record to delete.</param>
    /// <returns>No content.</returns>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<StudyRecord>> DeleteStudyRecord(int id)
    {
        var exist = await _repositories.FindStudyRecord(id);
        if (!exist)
        {
            return NotFound();
        }

        await _repositories.DeleteStudyRecord(id);
        return NoContent();
    }

    /// <summary>
    /// Gets a specific study record.
    /// </summary>
    /// <param name="id">The ID of the study record to retrieve.</param>
    /// <returns>The specific study record.</returns>
    [HttpGet("{id}", Name = "GetRecord")]
    public IEnumerable<string> GetProduct(int id)
    {
        return new List<string>
        {
            $"This message is from Target ID :{id}"
        };
    }
}

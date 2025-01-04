﻿using Microsoft.AspNetCore.Http;
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

    [HttpPost()]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<StudyRecord>> AddStudyRecord(StudyRecord record)
    {
        var newRecord = await _repositories.AddStudyRecord(record);
        return CreatedAtAction("GetProduct", newRecord);
    }

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

}

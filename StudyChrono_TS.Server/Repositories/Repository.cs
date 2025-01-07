using Microsoft.EntityFrameworkCore;
using StudyChrono_TS.Server.Data;
using StudyChrono_TS.Server.Models;

namespace StudyChrono_TS.Server.Repositories;

/// <summary>
/// Repository class for managing StudyRecord entities.
/// </summary>
public class Repository : IRepositories
{
    private readonly StudyChronoDbContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="Repository"/> class.
    /// </summary>
    /// <param name="context">The database context to be used by the repository.</param>
    public Repository(StudyChronoDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retrieves all study records from the database.
    /// </summary>
    /// <returns>A collection of <see cref="StudyRecord"/>.</returns>
    public async Task<IEnumerable<StudyRecord>> GetStudyRecords()
    {
        return await _context.StudyRecords.ToListAsync();
    }

    /// <summary>
    /// Retrieves a specific study record by its ID.
    /// </summary>
    /// <param name="id">The ID of the study record to retrieve.</param>
    /// <returns>The <see cref="StudyRecord"/> with the specified ID.</returns>
    /// <exception cref="NotImplementedException">Thrown when the method is not implemented.</exception>
    public async Task<StudyRecord> GetStudyRecord(int id)
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Adds a new study record to the database.
    /// </summary>
    /// <param name="studyRecord">The study record to add.</param>
    /// <returns>The added <see cref="StudyRecord"/>.</returns>
    public async Task<StudyRecord> AddStudyRecord(StudyRecord studyRecord)
    {
        _context.StudyRecords.Add(studyRecord);
        await _context.SaveChangesAsync();

        return studyRecord;
    }

    /// <summary>
    /// Updates an existing study record in the database.
    /// </summary>
    /// <param name="studyRecord">The study record to update.</param>
    /// <returns>The updated <see cref="StudyRecord"/>.</returns>
    /// <exception cref="Exception">Thrown when the record is not found.</exception>
    public async Task<StudyRecord> UpdateStudyRecord(StudyRecord studyRecord)
    {
        // レコード更新処理
        var targetRecord = _context.StudyRecords.Find(studyRecord.Id);
        if (targetRecord == null) { throw new Exception("Record not found."); }

        targetRecord.Title = studyRecord.Title;
        targetRecord.StudyTime = studyRecord.StudyTime;
        await _context.SaveChangesAsync();

        return studyRecord;
    }

    /// <summary>
    /// Checks if a study record exists in the database by its ID.
    /// </summary>
    /// <param name="id">The ID of the study record to check.</param>
    /// <returns><c>true</c> if the study record exists; otherwise, <c>false</c>.</returns>
    public async Task<bool> FindStudyRecord(int id)
    {
        return await _context.StudyRecords.AnyAsync(e => e.Id == id);
    }

    /// <summary>
    /// Deletes a study record from the database by its ID.
    /// </summary>
    /// <param name="id">The ID of the study record to delete.</param>
    /// <returns>A task that represents the asynchronous delete operation.</returns>
    public async Task DeleteStudyRecord(int id)
    {
        _context.StudyRecords.Remove(new StudyRecord() { Id = id });
        await _context.SaveChangesAsync();
    }
}

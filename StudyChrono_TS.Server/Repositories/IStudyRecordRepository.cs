using StudyChrono_TS.Server.Models;

namespace StudyChrono_TS.Server.Repositories;

/// <summary>
/// Represents the interface for the study record repository.
/// </summary>
public interface IStudyRecordRepository
{
    /// <summary>
    /// Retrieves all study records.
    /// </summary>
    /// <returns>An asynchronous operation that returns a collection of study records.</returns>
    Task<IEnumerable<StudyRecord>> GetStudyRecords();

    /// <summary>
    /// Retrieves a study record by its ID.
    /// </summary>
    /// <param name="id">The ID of the study record.</param>
    /// <returns>An asynchronous operation that returns the study record.</returns>
    Task<StudyRecord> GetStudyRecord(int id);

    /// <summary>
    /// Adds a new study record.
    /// </summary>
    /// <param name="studyRecord">The study record to add.</param>
    /// <returns>An asynchronous operation that returns the added study record.</returns>
    Task<StudyRecord> AddStudyRecord(StudyRecord studyRecord);

    /// <summary>
    /// Updates an existing study record.
    /// </summary>
    /// <param name="studyRecord">The study record to update.</param>
    /// <returns>An asynchronous operation that returns the updated study record.</returns>
    Task<StudyRecord> UpdateStudyRecord(StudyRecord studyRecord);

    /// <summary>
    /// Finds a study record by its ID.
    /// </summary>
    /// <param name="id">The ID of the study record.</param>
    /// <returns>An asynchronous operation that returns a boolean indicating whether the study record was found.</returns>
    Task<bool> FindStudyRecord(int id);

    /// <summary>
    /// Deletes a study record by its ID.
    /// </summary>
    /// <param name="id">The ID of the study record to delete.</param>
    /// <returns>An asynchronous operation.</returns>
    Task DeleteStudyRecord(int id);
}

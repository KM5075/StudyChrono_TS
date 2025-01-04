using StudyChrono_TS.Server.Models;

namespace StudyChrono_TS.Server.Repositories;

public interface IStudyRecordRepository
{
    Task<IEnumerable<StudyRecord>> GetStudyRecords();
    Task<StudyRecord> GetStudyRecord(int id);
    Task<StudyRecord> AddStudyRecord(StudyRecord studyRecord);
    Task<StudyRecord> UpdateStudyRecord(StudyRecord studyRecord);
    Task<bool> FindStudyRecord(int id);
    Task DeleteStudyRecord(int id);
}

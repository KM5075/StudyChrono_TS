using StudyChrono_TS.Server.Models;

namespace StudyChrono_TS.Server.Repositories;

public class Repository : IRepositories
{
    public async Task<IEnumerable<StudyRecord>> GetStudyRecords()
    {
        throw new NotImplementedException();
    }

    public async Task<StudyRecord> GetStudyRecord(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<StudyRecord> AddStudyRecord(StudyRecord studyRecord)
    {
        throw new NotImplementedException();
    }

    public async Task<StudyRecord> UpdateStudyRecord(StudyRecord studyRecord)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> FindStudyRecord(int id)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteStudyRecord(int id)
    {
        throw new NotImplementedException();
    }
}

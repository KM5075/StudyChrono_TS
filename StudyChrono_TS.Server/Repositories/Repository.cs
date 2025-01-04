using Microsoft.EntityFrameworkCore;
using StudyChrono_TS.Server.Data;
using StudyChrono_TS.Server.Models;

namespace StudyChrono_TS.Server.Repositories;

public class Repository : IRepositories
{
    private readonly StudyChronoDbContext _context;

    public Repository(StudyChronoDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<StudyRecord>> GetStudyRecords()
    {
        return await _context.StudyRecords.ToListAsync();
    }

    public async Task<StudyRecord> GetStudyRecord(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<StudyRecord> AddStudyRecord(StudyRecord studyRecord)
    {
        _context.StudyRecords.Add(studyRecord);
        await _context.SaveChangesAsync();

        return studyRecord;
    }

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

    public async Task<bool> FindStudyRecord(int id)
    {
        return await _context.StudyRecords.AnyAsync(e => e.Id == id);
    }

    public async Task DeleteStudyRecord(int id)
    {
        _context.StudyRecords.Remove(new StudyRecord() { Id = id });
        await _context.SaveChangesAsync();
    }
}

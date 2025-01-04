using Microsoft.EntityFrameworkCore;
using StudyChrono_TS.Server.Models;

namespace StudyChrono_TS.Server.Data;

public class StudyChronoDbContext : DbContext
{
    public StudyChronoDbContext(DbContextOptions<StudyChronoDbContext> options) : base(options)
    {
    }

    public DbSet<StudyRecord> StudyRecords { get; set; }
}

namespace StudyChrono_TS.Server.Models;

/// <summary>
/// Study record model.
/// </summary>
public class StudyRecord
{
    /// <summary>
    /// Gets or sets the ID of the study record.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the title of the study record.
    /// </summary>
    public string Title { get; set; }

    /// <summary>
    /// Gets or sets the study time in hour.
    /// </summary>
    public int StudyTime { get; set; }
}

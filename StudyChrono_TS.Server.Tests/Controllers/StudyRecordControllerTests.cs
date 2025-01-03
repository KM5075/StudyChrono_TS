using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using StudyChrono_TS.Server.Controllers;
using StudyChrono_TS.Server.Models;
using StudyChrono_TS.Server.Repositories;
using StudyChrono_TS.Server.Tests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace StudyChrono_TS.Server.Controllers.Tests;

[TestClass()]
public class StudyRecordControllerTests
{
    [TestMethod()]
    public async Task GetStudyRecords_MultipleRecord()
    {
        // Arrange
        var mockRepository = new Mock<IRepositories>();
        mockRepository.Setup(repo => repo.GetStudyRecords()).ReturnsAsync(new List<StudyRecord>()
        {
            new StudyRecord() { Id = 1, Title = "StudyRecord1", StudyTime = 10 },
            new StudyRecord() { Id = 2, Title = "StudyRecord2", StudyTime = 20 },
            new StudyRecord() { Id = 3, Title = "StudyRecord3", StudyTime = 30 }
        });
        var controller = new StudyRecordController(mockRepository.Object);

        // Act
        ActionResult<IEnumerable<StudyRecord>> result = await controller.GetStudyRecords();
        var statusCode = ApiTestHelper.GetStatusCode(result);
        var records = result.Value as List<StudyRecord>;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual((int)HttpStatusCode.OK, statusCode);
        Assert.IsNotNull(records);
        Assert.AreEqual(3, records.Count);
    }

    [TestMethod()]
    public async Task GetStudyRecords_NoRecord()
    {
        // Arrange
        var mockRepository = new Mock<IRepositories>();
        mockRepository.Setup(repo => repo.GetStudyRecords()).ReturnsAsync(new List<StudyRecord>());
        var controller = new StudyRecordController(mockRepository.Object);

        // Act
        ActionResult<IEnumerable<StudyRecord>> result = await controller.GetStudyRecords();
        var statusCode = ApiTestHelper.GetStatusCode(result);
        var records = result.Value as List<StudyRecord>;

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual((int)HttpStatusCode.NoContent, statusCode);
        Assert.IsNull(records);
    }
}

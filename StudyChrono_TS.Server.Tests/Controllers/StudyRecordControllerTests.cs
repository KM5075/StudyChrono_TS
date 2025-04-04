﻿using Microsoft.AspNetCore.Http;
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

    [TestMethod()]
    public async Task AddStudyRecord_Ok()
    {
        // Arrange
        var mockRepository = new Mock<IRepositories>();
        mockRepository.Setup(repo => repo.AddStudyRecord(It.IsAny<StudyRecord>())).ReturnsAsync(new StudyRecord() { Id = 2, Title = "StudyRecord1", StudyTime = 10 });
        var controller = new StudyRecordController(mockRepository.Object);
        var record = new StudyRecord() { Id = 1, Title = "StudyRecord1", StudyTime = 10 };

        // Act
        ActionResult<StudyRecord> result = await controller.AddStudyRecord(record);
        var actionResult = result.Result as CreatedAtActionResult;
        var newRecord = actionResult.Value as StudyRecord;
        var statusCode = ApiTestHelper.GetStatusCode(result);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual((int)HttpStatusCode.Created, statusCode);
        Assert.IsNotNull(newRecord);
        Assert.AreEqual(2, newRecord.Id);
        Assert.AreEqual("StudyRecord1", newRecord.Title);
        Assert.AreEqual(10, newRecord.StudyTime);
    }

    [TestMethod()]
    public async Task UpdateStudyRecord_Ok()
    {
        // Arrange
        var mockRepository = new Mock<IRepositories>();
        mockRepository.Setup(repo => repo.FindStudyRecord(It.IsAny<int>())).ReturnsAsync(true);
        mockRepository.Setup(repo => repo.UpdateStudyRecord(It.IsAny<StudyRecord>())).ReturnsAsync(new StudyRecord() { Id = 1, Title = "StudyRecord1", StudyTime = 10 });
        var controller = new StudyRecordController(mockRepository.Object);
        var record = new StudyRecord() { Id = 1, Title = "StudyRecord1", StudyTime = 10 };

        // Act
        ActionResult<StudyRecord> result = await controller.UpdateStudyRecord(1, record);
        var updatedRecord = result.Value as StudyRecord;
        var statusCode = ApiTestHelper.GetStatusCode(result);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual((int)HttpStatusCode.OK, statusCode);
        Assert.IsNotNull(updatedRecord);
        Assert.AreEqual(1, updatedRecord.Id);
        Assert.AreEqual("StudyRecord1", updatedRecord.Title);
        Assert.AreEqual(10, updatedRecord.StudyTime);
    }

    [TestMethod()]
    public async Task UpdateStudyRecord_BadRequest()
    {
        // Arrange
        var mockRepository = new Mock<IRepositories>();
        var controller = new StudyRecordController(mockRepository.Object);
        var record = new StudyRecord() { Id = 1, Title = "StudyRecord1", StudyTime = 10 };

        // Act
        ActionResult<StudyRecord> result = await controller.UpdateStudyRecord(2, record);
        var statusCode = ApiTestHelper.GetStatusCode(result);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual((int)HttpStatusCode.NotFound, statusCode);
    }

    [TestMethod()]
    public async Task UpdateStudyRecord_NotFound()
    {
        // Arrange
        var mockRepository = new Mock<IRepositories>();
        mockRepository.Setup(repo => repo.FindStudyRecord(It.IsAny<int>())).ReturnsAsync(false);
        var controller = new StudyRecordController(mockRepository.Object);
        var record = new StudyRecord() { Id = 1, Title = "StudyRecord1", StudyTime = 10 };

        // Act
        ActionResult<StudyRecord> result = await controller.UpdateStudyRecord(1, record);
        var statusCode = ApiTestHelper.GetStatusCode(result);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual((int)HttpStatusCode.NotFound, statusCode);
    }

    [TestMethod()]
    public async Task DeleteStudyRecord_NoContents()
    {
        // Arrange
        var mockRepository = new Mock<IRepositories>();
        mockRepository.Setup(repo => repo.FindStudyRecord(It.IsAny<int>())).ReturnsAsync(true);
        mockRepository.Setup(repo => repo.DeleteStudyRecord(It.IsAny<int>()));
        var controller = new StudyRecordController(mockRepository.Object);

        // Act
        ActionResult<StudyRecord> result = await controller.DeleteStudyRecord(1);
        var statusCode = ApiTestHelper.GetStatusCode(result);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual((int)HttpStatusCode.NoContent, statusCode);
    }

    [TestMethod()]
    public async Task DeleteStudyRecord_NotFound()
    {
        // Arrange
        var mockRepository = new Mock<IRepositories>();
        mockRepository.Setup(repo => repo.FindStudyRecord(It.IsAny<int>())).ReturnsAsync(false);
        var controller = new StudyRecordController(mockRepository.Object);

        // Act
        ActionResult<StudyRecord> result = await controller.DeleteStudyRecord(1);
        var statusCode = ApiTestHelper.GetStatusCode(result);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual((int)HttpStatusCode.NotFound, statusCode);
    }
}

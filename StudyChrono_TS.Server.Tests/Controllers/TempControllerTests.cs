using Microsoft.VisualStudio.TestTools.UnitTesting;
using StudyChrono_TS.Server.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyChrono_TS.Server.Controllers.Tests;

[TestClass()]
public class TempControllerTests
{
    [TestMethod()]
    public void GetTest()
    {
        // Arrange
        var controller = new TempController();

        // Act
        var result = controller.Get();

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual("Hello World!", result.Value);
    }
}
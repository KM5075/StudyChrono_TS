using Microsoft.EntityFrameworkCore;
using StudyChrono_TS.Server.Data;
using StudyChrono_TS.Server.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<StudyChronoDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SQLITE_CONNECTIONSTRING") ?? throw new InvalidOperationException("Connection string 'SQLITE_CONNECTIONSTRING' not found.")));

builder.Services.AddScoped<IRepositories,Repository>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

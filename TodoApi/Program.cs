using Microsoft.EntityFrameworkCore;
using TodoApi;


var builder = WebApplication.CreateBuilder(args);

// הוספת חיבור למסד נתונים
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("ToDoDB"),
        new MySqlServerVersion(new Version(8, 0, 21))
    ));

// הגדרת CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// הוספת Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// הפעלת CORS
app.UseCors("AllowSpecificOrigin");

// הפעלת Swagger רק במצב פיתוח
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// קבלת כל המערכים
app.MapGet("/", async (ToDoDbContext db) => await db.Items.ToListAsync());
 

//הוספת מוצר
app.MapPost("/addItem", async (ToDoDbContext db, Item item) =>
{
    db.Items.Add(item); // הוספת הפריט למסד הנתונים
    await db.SaveChangesAsync(); // שמירת השינויים
   // החזרת סטטוס 201 עם הפריט שנוסף
    return Results.Created($"/addItem/{item.Id}", item);
});
//מחיקה מוצר
app.MapDelete("/deleteItem/{id}", async (ToDoDbContext db, int id) =>{
    var item = await db.Items.FindAsync(id);
    if (item == null)
    {
        return Results.NotFound($"Item with ID {id} not found.");
    }   
    
    db.Items.Remove(item); 
    await db.SaveChangesAsync(); 
    return Results.Ok($"Item with ID {id} deleted successfully.");
});

//עידכון
app.MapPut("/updateItem/{id}", async (ToDoDbContext db, int id,Item updateItem )=>
{
    var item= await db.Items.FindAsync(id);
    if (item == null)
    {
        return Results.NotFound($"Item with ID {id} not found.");
    }
    item.IsComplete=updateItem.IsComplete;
    await db.SaveChangesAsync();
    return Results.Ok(item);
});
//כל המשתמשים
// app.MapGet("/users", async (ToDoDbContext db) => await db.Users.ToListAsync()); // הוספת קבלת כל המשתמשים

app.Run();
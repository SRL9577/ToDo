using System;
using System.Collections.Generic;

namespace TodoApi;


public class User // שים לב לשם User ולא Users
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

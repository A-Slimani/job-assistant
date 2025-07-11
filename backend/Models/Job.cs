using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public partial class Job
{
    [MaxLength(256)]
    public string Id { get; set; } = string.Empty;
    [MaxLength(256)]
    public string Title { get; set; } = string.Empty;
    [MaxLength(256)]
    public string? Company { get; set; }
    [MaxLength(256)]
    public string? Salary { get; set; }
    [MaxLength(256)]
    public string? Location { get; set; }
    [MaxLength(256)]
    public string? Link { get; set; }
    [MaxLength(256)]
    public string Website { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    [MaxLength(256)]
    public string Status { get; set; } = string.Empty;
    [MaxLength(4096)]
    public string? AdditionalInfo { get; set; }
}

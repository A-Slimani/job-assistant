using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController(JobContext context) : ControllerBase
    {
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobs()
        {
            return Ok(await context.Jobs.ToListAsync());
        }
    }
}